# Loops in Rust

## For Loops

The `for` loop is used to loop a particular number of times. Rust’s `for` loops work a bit differently than in other systems languages, however. 

Rust’s `for` loop doesn’t look like this “C-style” `for` loop:

```c
for (x = 0; x < 10; x++) {
    printf("%d\n", x);
}
```

Instead, it looks like this:

```rust
for x in 0..10 {
    println!("{}", x); // x: i32
}
```

In slightly more abstract terms:

```pseudo
for var in expression {
    code
}
```

The expression is an iterator. The _iterator_ gives back a series of elements. Each element is one iteration of the loop. That value is then bound to the name `var`, which is valid for the loop body. Once the body is over, the next value is fetched from the iterator, and we loop another time. When there are no more values, the `for` loop is over.

In our example, `0..10` is an expression that takes a start and an end position, and gives an iterator over those values. The upper bound is exclusive, though, so our loop will print 0 through 9, but not 10.

**Note:** Rust does not have the “C-style” `for` loop on purpose. Manually controlling each element of the loop is complicated and error prone, even for experienced C developers.

## Enumerate

When you need to keep track of how many times you already looped, you can use the `.enumerate()` function.

On ranges:

```rust
for (i,j) in (5..10).enumerate() {
    println!("i = {} and j = {}", i, j);
}
```

Outputs:

```bash
i = 0 and j = 5
i = 1 and j = 6
i = 2 and j = 7
i = 3 and j = 8
i = 4 and j = 9
```

Don't forget to add the parentheses around the range!

On iterators:

```rust
for (linenumber, line) in lines.enumerate() {
    println!("{}: {}", linenumber, line);
}
```

Outputs:

```bash
0: Content of line one
1: Content of line two
2: Content of line tree
3: Content of line four
```

## While Loops

Rust also has a `while` loop. It looks like this:

```rust
let mut x = 5;          // mut x: i32
let mut done = false;   // mut done: bool

while !done {
    x += x - 3;

    println!("{}", x);

    if x % 5 == 0 {
        done = true;
    }
}
```

`while` loops are the correct choice when you’re not sure how many times you need to loop.

## Loop Keyword

If you need an infinite loop, you may be tempted to write this:

```rust
while true {

}
```

However, Rust has a dedicated keyword, `loop`, to handle this case:

``rust
loop {

}
```

Rust’s control-flow analysis treats this construct differently than a `while true`, since we know that it will always loop. In general, the more information we can give to the compiler, the better it can do with safety and code generation, so you should always prefer loop when you plan to loop infinitely.

## Break and Continue

Let’s take a look at that while loop we had earlier:

```rust
let mut x = 5;
let mut done = false;

while !done {
    x += x - 3;

    println!("{}", x);

    if x % 5 == 0 {
        done = true;
    }
}
```

We had to keep a dedicated `mut` boolean variable binding, `done`, to know when we should exit out of the `while` loop. Rust has two keywords to help us with modifying iteration: `break` and `continue`.

In this case, we can write the loop in a better way with `break`:

```rust
let mut x = 5;

loop {
    x += x - 3;

    println!("{}", x);

    if x % 5 == 0 { break; }
}
```

We now loop forever with loop and use `break` to break out early.

`continue` is similar, but instead of ending the loop, goes to the next iteration. This will only print the odd numbers:

``rust
for x in 0..10 {
    if x % 2 == 0 { continue; }

    println!("{}", x);
}
```

Both `continue` and `break` are valid in both `while` loops and `for` loops.