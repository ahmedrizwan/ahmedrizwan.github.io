---
title: "Architecture Components: Easy Mapping of Actions and UI State"
date: "2019-08-25T22:40:32.169Z"
template: "post"
draft: false
slug: "arch-components-easy-mapping-actions-ui"
category: "Android"
tags:
  - "Kotlin"
  - "Architecture Components"
description: "When building an app, most of the time what we’re doing is pretty much mapping direct/indirect actions to some UI state."
---

When building an app, most of the time what we’re doing is pretty much mapping direct/indirect actions to some UI state.

While using Architecture Components, achieving this is quite easy with the help of LiveData + Coroutines + ViewModels — but it does require a bit of code to set it up.

Reason being that in order to observe “state” of a LiveData, we have to write a wrapper around its value, as well as integrate actions around this state.

Let’s take an example, there’s a list-based UI where

-- data is loaded from an API

-- user can swipe-refresh and retry API call etc

Given these requirements, the actions would be:

- Load
- Swipe Refresh
- Retry

And based on these actions, UI state can be one of these at any given time:

- Success
- Loading
- Swipe-Refreshing
- Failure
- SwipeRefresh-Failure
- Retrying

## The State Machine

If we were to map the states and actions mentioned above using a diagram — it’ll look something like:

<figure class="float">
	<img src="/media/arch-components-state-machine.jpeg" alt="State Machine">
</figure>

Actions can either be implicit or explicit. The difference is that explicit actions (shown as blue arrows) are those actions that are triggered by the user and implicit aren’t.

## Let’s code it out!

### State

Starting with the State, let’s create a wrapper for state representation using sealed classes.

```kotlin
sealed class UIState<out R> {
    object Loading : UIState<Nothing>()
    object Retrying : UIState<Nothing>()
    object SwipeRefreshing : UIState<Nothing>()
    data class Success<T>(val data: T) : UIState<T>()
    data class Failure(val exception: Exception) : UIState<Nothing>()
    data class SwipeRefreshFailure(val exception: Exception) : UIState<Nothing>()
}
```

### Actions

Similar to the states, we’ll create a wrapper for representing actions

```kotlin
sealed class Action {
    object Load : Action()
    object SwipeRefresh : Action()
    object Retry : Action()
}
```

### LiveData

We’ll need a custom LiveData that handles all actions and spits out appropriate state based on them (similar to what reducers do in Redux).

It should also do API call using Coroutines and propagate exceptions.

Implementation:

```kotlin
class ActionStateLiveData<T>(
    private val coroutineContext: CoroutineContext,
    fetchData: (suspend () -> Response<T>)
) {
    private val action = MutableLiveData<Action>()
    private var data: T? = null // backing data

    val state = action.switchMap {
        liveData(context = coroutineContext) {
            when (action.value) {
                Action.Load -> {
                    emit(UIState.Loading)
                }

                Action.SwipeRefresh -> {
                    emit(UIState.SwipeRefreshing)
                }

                Action.Retry -> {
                    emit(UIState.Retrying)
                }
            }

            try {
                val response = fetchData()
                val body = response.body()
                when {
                    response.isSuccessful && body != null -> {
                        data = body
                        emit(UIState.Success(body))
                    }
                    action.value == Action.SwipeRefresh -> {
                        emit(UIState.SwipeRefreshFailure(Exception()))
                    }
                    else -> {
                        emit(UIState.Failure(Exception()))
                    }
                }
            } catch (exception: Exception) {
                when {
                    action.value == Action.SwipeRefresh -> {
                        emit(UIState.SwipeRefreshFailure(Exception()))
                        data?.let {
                            // emit success with existing data
                            emit(UIState.Success(it))
                        }
                    }
                    else -> {
                        emit(UIState.Failure(Exception()))
                    }
                }
            }
        }
    }

    // Helpers for triggering different actions

    fun retry() {
        action.value = Action.Retry
    }

    fun swipeRefresh() {
        action.value = Action.SwipeRefresh
    }

    fun load() {
        action.value = Action.Load
    }
}
```

Using the new liveData block (that is actually a suspend block) and emit method — we can execute async code and emit values.

The switchMap block is also the new syntax for doing Transformations.switchMap() on a mutable LiveData.

Last part are the methods for dispatching actions.

### ViewModel

As we’re dealing with Coroutines, we’ll specify the scope to be viewModelScope and use Dispatchers.IO as the coroutine context.

```kotlin
val users = ActionStateLiveData(viewModelScope.coroutineContext + Dispatchers.IO) {
    userService.fetchUsers()
}
```

viewModelScope → Bind the lifetime of our Coroutine to the lifetime of ViewModel
Dipatchers.IO → Run coroutine block asynchronously

### UI (Fragment/Activity)

Once all done — UI is pretty straight forward, we initialize the viewModel, dispatch the initial load action and observe result.

```kotlin
val viewModel: ProfileViewModel by viewModels()
// In onCreate
viewModel.users.load()
swipeRefreshLayout.setOnRefreshListener {
    viewModel.users.swipeRefresh()
}
retryButton.setOnClickListener {
    viewModel.users.retry()
}
viewModel.users.state.observe(this) { state ->
    when (state) {
        Loading -> // show progress bar
        Success -> // load up data
        Failure -> // show error
        Retrying -> // a different loader
        SwipeRefreshing -> // show swipe refresh loader
        SwipeRefreshingFailure -> // show error
   }
}
```

That’s it for now — this was a basic example of how we can use LiveData + Coroutine + ViewModel to map actions & UI state. Things get a bit more tricky when dealing with pagination and unorthodox UI rules — I’ll try to cover those as well in the future.

Happy coding!
