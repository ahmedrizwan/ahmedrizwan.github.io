---
title: "Real World Functional Programming with Kotlin"
date: "2019-09-02T22:40:32.169Z"
template: "post"
draft: false
slug: "real-world-functional-programming"
category: "Kotlin"
tags:
  - "Kotlin"
  - "Functional Programming"
description: "Arrow is a functional programming tool-kit for Kotlin. We can apply a lot of the functional programming concepts with it, as we do in other purely functional programming languages."
---

[Arrow](https://arrow-kt.io) is a functional programming tool-kit for Kotlin. We can apply a lot of the functional programming concepts with it, as we do in other purely functional programming languages.

## A Real World Example

I came across [this](https://www.youtube.com/watch?v=m40YOZr1nxQ) video — about functional programming in Scala by Jordan Parmer. In the video Functional programming concepts are beautifully explained and demonstrated using Scala & [scalaz](https://scalaz.github.io/7/).

And I had the idea of achieving something similar with Kotlin & Arrow. Following the real world example in the video — the task is to **map raw data to domain specific data**. Pretty straight forward stuff but not too simple when considering the edge cases and code-safety.

## Railway Pattern

<figure class="float" style="width: 740px">
	<img src="/media/railway.jpeg" alt="Railway Pattern">
</figure>

In a flow — there can be a number of operations, any one can fail — we want to bypass to Failure as early as possible without compromising/halting the execution of the program itself.

Keeping this in mind, let’s take a look at an example, starting with the main method:

```kotlin
fun main() {
  generateRawUsers()
    .map(rawUser -> domainUserFrom(rawUser))
    .map(domainUser -> println(domainUser))
}
```

We’ll be performing three tasks:

- Generate raw users (dummy data)
- Map those raw users to Domain users
- Print them!

## Generating RawUser data

For the purpose of this example, creating three dummy RawUsers

The model:

```kotlin
data class RawUser(val fullName: String,
                   val email: String,
                   val phone: String,
                   val streetAddress: String,
                   val city: String,
                   val zipCode: String)
```

Method for generating Dummy RawUser objects:

```kotlin
fun generateRawUsers() = listOf(
        RawUser("Roth Drake", "vestibulum.nec@eratEtiam.net", "1-230-665-4456", "P.O. Box 980, 4942 Mattis. St.", "Gellik", "10691"),
        RawUser("Kevin Kaufman", "sem@necorciDonec.ca", "1-609-284-0788", "Ap #840-3698 Ipsum. Ave", "Ficarolo", "25265"),
        RawUser("Ahmed", "ahmed@something.com", "1-721-480-0788", "P.O. Box 701, 2269 Orci. Road", "Limelette", "22598"),
        RawUser("Hall Dale", "turpis@Cumsociis.net", "1-153-279123-7425", "Ap #682-1860 Vivamus St.", "Oyen", "47919"),
        RawUser("Harlan Ferguson", "feugiat.nec.diam@ac.edu", "1-185-179-abcd", "Ap #146-2358 Risus, Rd.", "Murdochville", "50832"),
        RawUser("Lance Cabrera", "non.sollicitudin@natoquepenatibuset.co.uk", "1-413-858-6331", "Ap #769-4638 In Avenue", "Arvier", "66909"),
      ...
)
```

Note: This data is sort of corrupt — as the second user doesn’t have a last name & in our domain model, we require one.

## Mapping RawUser to DomainUser

The model:

```kotlin
data class DomainUser(val person: Person,
                      val phoneNumber: PhoneNumber)

data class Person(val firstName: String,
                  val lastName: String)

data class PhoneNumber(val countryCode: Int,
                       val areaCode: Int,
                       val prefix: Int,
                       val lineNumber: Int)
```

The differences between Raw and Domain data:

- In RawUser we have name — in Domain, firstName & lastName
- In RawUser we have phone number string — in Domain phone number is composed up of countryCode, areaCode, prefix and lineNumber
- So we’ll need parsers in order to extract this info and also do so in a safe way (without crashes)

### Extracting Person

Let’s look at the name, normally we’d write something like this to extract to first & last names from a string:

```kotlin
fun personFrom(name: String): Person {
    val names = name.split(" ")
    if (names.size == 2) {
        val firstName = names[0]
        val lastName = names[1]

        return Person(firstName, lastName)
    }
    throw Exception("Can't extract first and last names from $name")
}
```

Do you see any problem with this implementation?

First off, the signature of the method is a lie! It doesn’t just return Person… it can throw can exception as well. Plus it’ll halt execution if an exception is encountered. How is that bad? Well consider this: If you have a million raw users and the first one has malformed data, the rest won’t be parsed either. This execution flow shouldn’t halt in such cases.

Solution: Don’t throw exception, instead return it — using the **Either** construct. With Either, we return **Right** in success case and **Left** in failure.

```kotlin
fun personFrom(name: String): Either<Exception, Person> {
    val names = name.split(" ")
    if (names.size == 2) {
        val firstName = names[0]
        val lastName = names[1]

        return Right(Person(firstName, lastName))
    }
    return Left(Exception("Can't extract first and last names from $name"))
}
```

Now the method signature is kinda true as to what the method implementation does.

### Extracting PhoneNumber

Ok the bad code first — using an incorrect regex (which doesn’t parse the last 4 digits correctly) to parse phone number and then assuming everything works:

```kotlin
// Regex pattern for extracting digits from a phone number
val incorrectPattern = """(\d)-(\d{3})-(\d{3})-(.{4})""".toRegex()

fun phoneNumberFrom(phone: String): Either<Exception, PhoneNumber> {
    val matched = incorrectPattern.matchEntire(phone)
    matched?.let {
        val values = it.groupValues.toList().takeLast(4)
        val countryCode = values[0].toInt()
        val areaCode = values[1].toInt()
        val prefix = values[2].toInt()
        val lineNumber = values[3].toInt()

        return PhoneNumber(countryCode, areaCode, prefix, lineNumber)
    }

    throw Exception("$phone is not the accepted format!")
}
```

Again — what’s wrong with this implementation: **It’s not safe!**

It can throw an exception on the last line but can also throw one if any of the toInt()’s fail too.

Solution:

- Use **Either** so that the method returns either an exception or PhoneNumber
- Use **Try** construct (also from Arrow) to create safeToInt() extension method on Strings, which returns Either an Int or an exception.
- Use **Either Monad Comprehension** binding to resolve all safeToInt() either constructs within a block.

```kotlin
// Regex pattern for extracting digits from a phone number
val incorrectPattern = """(\d)-(\d{3})-(\d{3})-(.{4})""".toRegex()

fun phoneNumberFrom(phone: String): Either<Exception, PhoneNumber> {
    val matched = incorrectPattern.matchEntire(phone)
    matched?.let {
        val values = it.groupValues.toList().takeLast(4)
        return binding {
            val countryCode = values[0].safeToInt().bind()
            val areaCode = values[1].safeToInt().bind()
            val prefix = values[2].safeToInt().bind()
            val lineNumber = values[3].safeToInt().bind()

            PhoneNumber(countryCode, areaCode, prefix, lineNumber)
        }
    }

    return Left(Exception("$phone is not the accepted format!"))
}

fun String.safeToInt(): Either<Exception, Int> {
    return Try { this.toInt() }.toEither { Exception("$this is not a number") }
}
```

Ok first off — what is Either Monad Comprehension? It’s a binding block which resolves all inner Either constructs and gives us Left or Right as a final result. That’s why in this implementation, we return a binding block, which resolves all safeToInt()’s either constructs — returns **Right(PhoneNumber)** if successful and **Left(Exception)** if failed to get Int.

And also in the case where regex pattern doesn’t match, we return **Left(Exception)** for an incorrect format.

This implementation is now completely safe and handles all the different cases where the phone number string is not correct.

## Creating DomainUser

Using a similar approach we’ll create a method for generating DomainUsers

```kotlin
fun domainUserFrom(rawUser: RawUser): Either<Exception, DomainUser> {
    return binding {
        val maybePerson = personFrom(rawUser.fullName).bind()
        val maybePhoneNumber = phoneNumberFrom(rawUser.phone).bind()
        DomainUser(maybePerson, maybePhoneNumber)
    }
}
```

This also uses **Either Monad Comprehension** and returns DomainUser only if both Person & PhoneNumber are generated successfully i.e. both are **Right** otherwise returns **Left(Exception)**.

## Printing the Results

If we execute the main method, the output would be:

```
Right(
    DomainUser(
        person=Person(
            firstName=Roth,
            lastName=Drake
        ),
        phoneNumber=PhoneNumber(
            countryCode=1,
            areaCode=230,
            prefix=665,
            lineNumber=4456
        )
    )
)
Left(
    Exception: Can't extract first and last names from Andrew
)
Right(
    DomainUser(
        person=Person(
            firstName=Kevin,
            lastName=Kaufman
        ),
        phoneNumber=PhoneNumber(
            countryCode=1,
            areaCode=609,
            prefix=284,
            lineNumber=788
        )
    )
)
```

The second user fails because it has no last name.

If the first user had an incorrect phone number, the output would become:

```
Left(
    Exception: 1-230-665-A32 is not a number
)
Right(
    DomainUser(
        person=Person(
            firstName=Roth,
            lastName=Drake
        ),
        phoneNumber=PhoneNumber(
            countryCode=1,
            areaCode=230,
            prefix=665,
            lineNumber=4456
        )
    )
)
Left(
    Exception: Can't extract first and last names from Andrew
)
```

The chain itself never fails or halts execution.

That’s it for now — Happy coding! If you want to check out the code:

https://github.com/ahmedrizwan/FunctionalKotlin-Demo
