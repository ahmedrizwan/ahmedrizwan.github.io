---
title: "Useful Rx Snippets #2"
date: "2018-09-02T22:40:32.169Z"
template: "post"
draft: false
slug: "useful-rx-snippets-2"
category: "Android"
tags:
  - "Android"
  - "Kotlin"
  - "Rx"
description: "Just a few random and (probably) useful Rx snippets in kotlin."
---

## Parallel Observables

Start n number of observables together, and get results of all as an array of responses.

Scenario → There are multiple network requests, that can be run independently, but these requests are to be considered as a single operation.

```kotlin
val networkObservable1 = Observable
        .fromPublisher<String> {
            println("Starting Observable 1")
            Thread.sleep(4000)
            it.onNext("Response 1")
        }.map {
            // process response (if needed)
            println(it)
            it
        }.subscribeOn(Schedulers.io()) // specify thread

val networkObservable2 = Observable
        .fromPublisher<String> {
            println("Starting Observable 2")
            Thread.sleep(1000)
            it.onNext("Response 2")
        }.map {
            println(it)
            it
        }
        .subscribeOn(Schedulers.io())

val networkObservable3 = Observable
        .fromPublisher<String> {
            println("Starting Observable 3")
            Thread.sleep(2000)
            it.onNext("Response 3")
        }.map {
            println(it)
            it
        }
        .subscribeOn(Schedulers.io())

val observables = arrayListOf(networkObservable1, networkObservable2, networkObservable3)

Observable.zip(observables) { responsesArray ->
    responsesArray.toCollection(ArrayList())
}.blockingSubscribe {
    // this block executes when all observables are done
    println(it)
}
```

What the output is:

<figure class="float">
	<img src="/media/useful-rx-parallel.gif" alt="Parallel Observables Gif">
</figure>

## Single Debounce

Create a debounce effect but only for the first n seconds (or milliseconds).

Scenario → There’s a need to add a small delay between the time response is returned and the time it’s displayed on screen. For example, showing a loader for at least 500ms, if the response is retrieved before 500ms, hold it, and if not then immediately show it.

```kotlin
// 500ms time window
val timer = Observable.timer(500, TimeUnit.MILLISECONDS)

// network operation observable
val networkObservable = Observable
        .fromPublisher<String> {
            Thread.sleep(100)
            it.onNext("Some Response!")
        }

// using the zipWith operator, debounce networkObservable response for the first 500ms
timer.zipWith(networkObservable, BiFunction { _: Long, networkResponse: String -> networkResponse })
     .blockingSubscribeBy {
        println(it)
     }
```

## Infinite Stream with error handling

Handle errors and resume an observable in case of any errors.

```kotlin
// defining proper errors
sealed class Error : Throwable() {
    object UserNotFound : Error()
    object AuthorizationError : Error()
    object UnknownError : Error()
}

typealias UserNotFound = Error.UserNotFound
typealias AuthorizationError = Error.AuthorizationError
typealias UnknownError = Error.UnknownError

// data stream (assume it's an infinite stream)
val usersStream = Observable.fromArray("Deadpool", "Cable", "Domino", "Juggernaut")

// error handling stream
val errorHandler = ObservableTransformer<String, String> {
    it.flatMap {
        Observable.just(it).map {
            if (it == "Cable") throw AuthorizationError
            if (it == "Domino") throw UserNotFound
            if (it != "Deadpool") throw UnknownError

            it
        }.onErrorResumeNext { error: Throwable ->
            // handle errors here
            when (error) {
                is UserNotFound -> Observable.just("Who dis?")
                is AuthorizationError -> Observable.just("You shall not pass! :@")
                else -> Observable.just("¯\\_(ツ)_/¯")
            }
        }
    }
}

usersStream.compose(errorHandler)
        .blockingSubscribe {
            println(it)
        }
```

What it prints out:

<figure class="float">
	<img src="/media/useful-rx-infinite-stream.png" alt="Infinite Stream">
</figure>

Scenario → [Login Screen](https://android.jlelse.eu/rxkotlin-login-screen-7413ba6b5e4f)

---

You can also checkout [Useful Rx Snippets #1](https://android.jlelse.eu/useful-rx-snippets-1-1f390ce727a7) for more snippets.

Happy coding!
