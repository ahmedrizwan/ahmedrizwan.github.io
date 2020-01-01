---
title: "MotionLayout — Basic Setup"
date: "2018-11-25T22:40:32.169Z"
template: "post"
draft: false
slug: "motion-layout-basic-setup"
category: "Android"
tags:
  - "Android"
  - "Motion Layout"
description: "A quick intro to MotionLayouts and it’s setup."
---

MotionLayout is the new layout in Android, for creating amazing interactive animations in android. It’s a part of ConstraintLayout 2.0 library.

To have MotionLayout up and running in your project, and to get a feel of how it works, you’ll need

- A starting layout
- An ending layout that has the ending constraints
- And a motion scene (which defines our animation)

And finally we connect our starting layout to the motion scene — and bamm!

First thing, add ConstraintLayout 2.0 to your build.gradle dependencies

```gradle
implementation 'com.android.support.constraint:constraint-layout:2.0.0-alpha2'
```

## Starting Layout

This can be our activity_main.xml

Just three views, with constraints all set! Two of these we’ll animate, and the third will stay static.

<figure class="float">
	<img src="/media/motion-layout-1.png" alt="Motion Layout 1">
</figure>

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layoutDescription="@xml/motion_scene"
        tools:context=".MainActivity">

    <TextView
            android:id="@+id/movingTextView"
            android:text="Moving Text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:layout_marginStart="8dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"/>

    <Button
            android:id="@+id/button"
            android:text="Slide Up"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:clickable="false"
            android:layout_marginBottom="8dp"
            android:layout_marginStart="8dp"
            android:layout_marginEnd="8dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"/>

    <TextView
            android:id="@+id/staticTextView"
            android:text="Static Text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:layout_marginEnd="8dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintEnd_toEndOf="parent"/>

</android.support.constraint.motion.MotionLayout>
```

## Ending Layout

We then create an ending layout, called activity_main_end.xml

Note: It only has the two views we intend to animate! (and their final constraints)

<figure class="float">
	<img src="/media/motion-layout-2.png" alt="Motion Layout 2">
</figure>

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.motion.MotionLayout
        xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    <TextView
            android:id="@+id/movingTextView"
            android:text="Moving Text"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginTop="8dp"
            android:layout_marginStart="8dp"
            android:layout_marginEnd="8dp"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintEnd_toEndOf="parent"/>

    <Button
            android:id="@+id/button"
            android:text="Slide Up"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_marginBottom="8dp"
            android:layout_marginEnd="8dp"
            android:layout_marginStart="8dp"
            android:layout_marginTop="8dp"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"/>

</android.support.constraint.motion.MotionLayout>
```

## Motion Scene

This is the file that defines the type of motion/animation we want and what the starting/ending constraints are.

Let’s call it motion_scene.xml (placed in res/xml/motion_scene.xml)

```xml
<?xml version="1.0" encoding="utf-8"?>
<MotionScene
        xmlns:motion="http://schemas.android.com/apk/res-auto">

    <Transition
            motion:constraintSetStart="@layout/activity_main"
            motion:constraintSetEnd="@layout/activity_main_end"
            motion:duration="1000">

        <OnSwipe
                motion:touchAnchorId="@id/button"
                motion:touchAnchorSide="top"
                motion:dragDirection="dragUp"/>

    </Transition>

</MotionScene>
```

Here we defined a Transition (the animation) with a duration & a start/end pointing to the layouts. And also a swipe Trigger on button (with up direction) — which adds interactivity.

Also make sure to add a reference to this motion_scene file in activity_main using

```
app:layoutDescription="@xml/motion_scene"
```

And thats it! A simple motion layout animation is now added to the project.

<figure class="float">
	<img src="/media/motion-layout-3.gif" alt="Motion Layout Gif">
</figure>

This article was just for a quick setup of MotionLayouts, I’d recommend checking out the following resources for a proper in-depth exploration on this topic.

https://medium.com/google-developers/introduction-to-motionlayout-part-i-29208674b10d

https://medium.com/google-developers/introduction-to-motionlayout-part-ii-a31acc084f59

https://medium.com/google-developers/introduction-to-motionlayout-part-iii-47cd64d51a5

Happy coding!
