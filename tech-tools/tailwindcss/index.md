# tailwindcss

## Other

There is no validation of classes. If you use bad class, you have to realize on your own.

### numbering system

1 rem = 4 in tailwindcss

eg. 
-   w-4 = width of 1 rem
-   w-5 = width of 1.25rem, cuz 1.25 * 4 = 5

## Classes

### Background

- .bg-{color}-{shadow}
    -   black, white without shadow eg. bg-black
    -   any other with shadow between 100-900, with steps by 50

### Width and height

-   .w|h-{size}
    -   0-64
    -   1/{3..12}
    -   screen, full

### Padding and Margin

-   .p|m{l,r,t,b,x,y}-{size}
    -   0-64
    -   x,y for numbers according to axis

### Styling text

-   .font-{family}
    -   eg. sans, serif, mono
-   .text-{size}
    - xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
-   .text{align}
    -   left, center, right, justify
-   .text-{color}-{shadow}
    -   black, white
    -   other
        -   100-900
-   .italic
-   .not-italic
-   .font-{weight}
    -   hairline - 100
    -   thin - 200
    -   light - 300
    -   normal - 400
    -   medium - 500
    -   semibold - 600
    -   bold - 700
    -   extrabold - 800
    -   dark - 900
-   .tracking-{spacing}
    -   to determine letter spacing, its measured in em not rems!
        -   em is based on parent element's font size, not document
    -   tighter
    -   light
    -   normal
    -   wide
    -   wider
    -   widest
-   .leading-{spacing}
    -   to determine a line height
    -   none
    -   tight
    -   sung
    -   normal
    -   relaxed
    -   loose
-   .underline
-   .no-underline
-   .line-through
-   .uppercase
-   .lowercase
-   .capitalize
-   .normal-case

### Border

-   .border-{side[t,b,l,r,EMPTY]}-{thickenss}
    -   0
    -   [EMPTY]
    -   2
    -   4
    -   8..
-   .border-{color}-{shadow}
    -   same as others
-   .border-{styles}
    -   solid
    -   dashed
    -   dotted
    -   doubled
    -   none
-   .rounded-{radius}
    -   sm
    -   [EMPTY]
    -   lg
    -   full
    -   none
-   .rounded-{side}-{radius}
    -   t,r,b,l,tl,tr,br,bl

### Display modes

-   .{display}
    -   block
    -   inline
    -   inline-block
    -   flex
    -   inline-flex
    -   grid
    -   table
    -   table-row
    -   table-cell
    -   hidden

### Responsive design

-   .{breakpoint}:{.classes}
    -   [ALL]
    -   sm 640px
    -   md 768px
    -   lg 1024px
    -   xl 1280px

[ALL] class is intend for mobile first, when we do p-4 sm:p-32 we assume that for mobile we have p-4 and any other device above 640px we start serving p-32

### Pseudo classes

-   .hover-{classes}
-   .focus-{classes}


### Transition

-   .transition-{properties}
    -   none
    -   all
    -   colors
    -   opacity
    -   shadow
    -   transform
    -   default duration is 150ms
-   .duration-{amount}
    -   75
    -   100
    -   150
    -   200
    -   300
    -   500
    -   700
    -   1000
-   .delay-{amount}
    -   75
    -   100
    -   150
    -   200
    -   300
    -   500
    -   700
    -   1000
-   .ease-{timing} (transition timing function)
    -   linear
    -   in
    -   out
    -   in-out

### Transform

You always need to apply at least .trasform class to enable it

If you want to make it "smooth", add transition-all class

-   .transform-{scale}
    -   0
    -   x-0
    -   y-0
    -   50
    -   x-50
    -   y-50
    -   ...
    -   150
-   .rotate-{angle}
    -   0
    -   1
    -   2
    -   3
    -   6
    -   12
    -   45
    -   90
    -   180
-   .skew-x-{amount}
    -   1
    -   2
    -   3
    -   6
    -   12
-   .skew-y-{amount}
    -   1
    -   2
    -   3
    -   6
    -   12
-   .translate-x-{amount}
    -   rem
        -   0
        -   0.5
        -   1
        -   ...
    -   percentage
        -   96
        -   full
        -   ...
-   .translate-y-{amount}
    -   rem
        -   0
        -   0.5
        -   1
        -   ...
    -   percentage
        -   96
        -   full
        -   ...
### Animation

-   .animate-{property}
    -   spin
    -   ping
    -   pulce
    -   bounce