# Condtionals in Rust

## If/Else

Branching with `if`-`else` is similar to other languages. Unlike many of them, the boolean condition doesn't need to be surrounded by parentheses, and each condition is followed by a block. 

`if`-`else` conditionals are expressions, and, all branches must return the same type.

```rust
let n = 5;

if n < 0 {
    print!("{} is negative", n);
} else if n > 0 {
    print!("{} is positive", n);
} else {
    print!("{} is zero", n);
}
```