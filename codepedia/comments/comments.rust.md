# Comments in Rust

Comments in Rust code follow the general C++ style of line comments and block comments. Non-doc comments are interpreted as a form of whitespace.

## Line Comments

Line comments are created using two consecutive forward slashes. The compiler ignores any text after `//` on the same line.

```rust
// This line will denote a comment in Rust
println!("Hello world!");
```

## Block Comments

Block comments are created using `/*` to begin the comment, and `*/` to end the comment. The compiler ignores any text in between.

```rust
/* 
This is all commented out.
None of it is going to run!
*/
```

Nested block comments are supported.

## Doc Comments

Line doc comments beginning with exactly three slashes (`///`), and block doc comments beginning with `/**` and `*/` to end. Both inner doc comments, are interpreted as a special syntax for doc attributes. That is, they are equivalent to writing `#[doc="..."]` around the body of the comment.

```rust
/// Foo
```

This will turn into `#[doc="Foo"]`.

```rust
/**
   Bar
*/
```
 
This will turn into `#[doc="Bar"]`.

Line comments beginning with `//!` and block comments `/*!` ... `*/` are doc comments that apply to the parent of the comment, rather than the item that follows. That is, they are equivalent to writing `#![doc="..."]` around the body of the comment. 

`//!` comments are usually used to document modules that occupy a source file.

Isolated CRs (`\r`), i.e. not followed by LF (`\n`), are not allowed in doc comments.