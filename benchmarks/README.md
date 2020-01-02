Benchmarks
==========

## Bootstrapping

This benchmark measures how long it takes to `require` the library. The
'require-noop.js' file is used as a baseline and does not import any external
file.

**Baseline**: `require-noop.js`
```shell
benchmarking node require-noop.js
time                 26.47 ms   (25.76 ms .. 27.00 ms)
                     0.998 R²   (0.996 R² .. 0.999 R²)
mean                 28.51 ms   (27.94 ms .. 29.04 ms)
std dev              1.259 ms   (1.056 ms .. 1.638 ms)
variance introduced by outliers: 15% (moderately inflated)
std dev              1.259 ms   (1.056 ms .. 1.638 ms)
variance introduced by outliers: 15% (moderately inflated)
```

**oembed-parser**: `require-oembed-parser.js`
```shell
benchmarking node require-oembed-parser.js
time                 47.98 ms   (47.46 ms .. 48.37 ms)
                     1.000 R²   (1.000 R² .. 1.000 R²)
mean                 49.74 ms   (49.05 ms .. 50.88 ms)
std dev              1.650 ms   (1.115 ms .. 2.344 ms)
```

**oembed-spec**: `require-oembed-spec.js`
```shell
benchmarking node require-oembed-spec.js
time                 59.64 ms   (58.05 ms .. 61.05 ms)
                     0.999 R²   (0.998 R² .. 1.000 R²)
mean                 62.58 ms   (61.62 ms .. 63.50 ms)
std dev              1.786 ms   (1.377 ms .. 2.313 ms)
```

## Running

* oembed-parser 3039 url/second
* **oembed-spec** 16825 url/second
