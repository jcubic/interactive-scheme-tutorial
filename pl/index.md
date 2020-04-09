# Interaktywny kurs języka Scheme Lisp

<!--
TODO:
* restart terminal after modify of define
* Rekurencja Ogonowa
* Continuations
* porty przez browserfs + service worker `__browserfs__`
-->

## Spis Treści

{{TOC}}

## Wstęp - co to jest Scheme

### Historia języka Lisp


Steve Russel na 

John McCarthy in 1958 MIT

Początkowo M-Expression

w postaci `car[cons[A,B]]`

```scheme
(define (map fn x)
  (cond ((null? x) (quote ()))
        (#t (cons (fn (car x))
                 (map fn (cdr x))))))

(define (consall x ys)
  (map (lambda (y) (cons x y)) ys))
  
(consall 'beat '(harvard yale))
```

Trzeba się przyzwyczaić do nawiasów, ale po jakimś czasie nie ma z tym problemu.


Wszystko jest wywołaniem funkcji

ale zamiast fn(x) robi się (fn x)




Ponieżej proste wyrażenie:

```scheme
(+ 2 (* 4 5))
```

Tak jak XML. Zauważ że brak przecinków,
elementy oddzielone od siebie białymi nakami.


Powyższy kod to jest lista który może być rozpatrywany także jak dane.

tzm. lista którego pierwszy element to plus (nie operator dodwania tylko
symbol plus który zazwyczaj oznacza operacje dodawania) potem liczba
następny symbol i kolejne dwie liczby.

Ale co się tak naprawdę dzieje

Spróbuj wpisać `+` i naciśnij enter. Czyli `+` to funkcja, co ciekwae
plus jest to zwykła funkcja dokładnie taka sama jak funkcje definiowane
przez Ciebie.

W innym języku możesz napisać coś takiego:

add(2, mul(4, 5));

i to jest normalne ale coś takiego już nie jest możliwe w większości języków.

+(2, *(4, 5))

natomiast w języku lisp właśnie to uzyskujesz, a dziwna składnia związana
z nawiasami to tylko wynik tego że wyszstko języku lisp to wywołanie funkcji
(lub czegoś co nazwya się wyrażeniem specylnym lub makrem o czym później).



Wszystkie wyrażenia w języku LISP są to listy

+(2, *(4, 5))

Języky scheme jest bardzo prosty. Istnieją 
także inne dialekty jezyka Lisp takie
jak Common Lisp, Clojure, Racket.

Zaprojektowany przez
Geralda Jay Sassmana oraz Guy L Steela w latach 70 w
labolatoriach MIT AI Lab.

Stworzony do nauczania programowania.

Był to pierwszy dialekt języka lisp który miał
zasięk leksykalny taraz coś co jest oczywiste
i dostępne w każdym języku.

Wiele cech jezyka Lisp została zapożyczona
przez inne języki programowania, często głośono
ogłaszane, jak np. odśmiecanie pamięci w języku
Java które było w języku LISP od samego początku.





## Komentarze

```scheme
;;;
```
## Zmienne

```scheme
(define x 10)
```

Dowolne znaki nawet +/*+ w jęzuku LISP i dialekcie
scheme nie ma operatorów tak jak w innych językach
zawsze jest to symbol który zawiera funkcje lub inny
obiekt który można wywołać.

Prawie każdy znak może być częścią nazwy
np. `+--=/<>$%^&*`.

## Symbole

(quote foo)

'foo

foo -> error

## Listy

```scheme
(define l (list 1 2 3))
(list? l)
(define l '(1 2 3))
```

### Para cons car cdr

```scheme
(define pair (cons 10 20))
(car pair)
(cdr pair)
(define l (cons 10 (cons 20 (cons 30 nil))))
```

Parę można utworzyć także w inny sposób tak
jak listy 

Listę można także utworzyć w inny sposób jako
wartość zacytowana bezpośrednio

```scheme
'(1 . 2)
```

Tak samo można utworzyć listę:

```scheme
'(1 . (2 . (3 . nil)))
```

Diagram.

### Operacje na listach

```
list?
```

`sort`

`member`

### Drzewa
### Listy Asociacyjne

assoc

### Cytowanie


```scheme
(define l '(1 2 3))
(caddr l)
(car (cdr (cdr l)))
```

## Eval
```scheme
(define s (list '+ 4 7))
(eval s)
```

## Funkcje / procedury

Aby zdefiniować funkcje piszemy:

```
(define (square x) (* x x)))
```

Jest to dokładnie to samo co:

```
(define square (lambda (x) (* x x)))
```

Lambda calculs Alonzo Church.

lambda to specjalne wyrażenie które tworzy
funkcje bez nazwy tutaj przypisujemy tą 
funkcję bez nazwy, która jest wartością
tak jak zwykła liczba czy ciąg znaków i przypisujemy
ją do zmiennej.


Pierwszy przykład robi dokładnie to samo, tylko wymaga mniej kodu do napisania. 

W odróżnieniu od języków takich jak C++ czy Java
czy innych o podobnej składni nie trzeba pisać
słowa kluczowego `return`. Ostatnie wyrażenie w danej funkcji jest to
wartość, która zostanie zwrócona przez funkcje.
Takie sam mechanizm jest zastosowany w językach
Ruby i R.

```scheme
(define (+ a b) (* a b))
(+ 1 2)
```


```scheme
(lambda (x) (* x x))
((lambda (x) (* x x)) 10)
```

```scheme
(define define 10)
(define lambda define)
```

## Instrukcje warunkowe if

if wygląda jak funkcja ale nie jest to jednak
zwykła funkcje jest to wyrażenie specjalne.

Tak jak `define`.


nie ma else

begin wiele wyrażeń.

### Wartości Logiczne

```scheme
#t
#f
```

### Operacje logiczne

eq? eqv? equal?

## Łańcuchy znaków

"this is \"quote\" string"

musimy użyć slasha aby wstawić cudzysłów wewnątrz ciągu znaków.

## Liczby

### Operacje na liczbach

(/ 1 2)
complex
float
integer

## Pętle

Język scheme nie ma pętli jako takich, zazwyczaj stosuje się
[rekurencje](#funkcje-rekurencyjne) w celu tworzenia pętli.
Można jednak utworzyć macro w celu stworzenia np. pętli `while` albo `for` przykłady takich makr
podam później.

## Funkcje rekurencyjne
Silnia
Metoda Hornera obliczania Wielomianów

```scheme
(define (sum . args)
  (if (null? args)
      0
      (+ (car args) (apply sum (cdr args)))))
```



## Funkcje wyższego rzędu (higher order procudure)

Meta funkcje.

```scheme
(define (map fn list)
  (let iter ((list list) (result '()))
    (if (null? list)
        result
        (iter (cdr list) (cons (fn (car list)) result)))))

(define (values alist) (map cdr alist))
(define (keys alist) (map car alist))
(define (make-alist keys values) (map cons keys values))
```




```scheme
(define (reduce fun lst)
  (let iter ((result (car lst))
             (lst lst))
    (if (null? (cdr lst))
        result
        (iter (fun result (cadr lst)) (cdr lst)))))
```

```scheme
(define (filter fun lst)
  (let iter ((result '())
	     (lst lst))
    (if (null? lst) 
	result
	(if (fun (car lst))
	    (iter (append result (list (car lst))) (cdr lst))
	    (iter result (cdr lst))))))
```

## Środowiska i zmienne lokalne

```
let, lambda
```

```scheme
(let ((x 10))
  (define y (+ x x))
  (display y))
  
(display y)
```

## Domknięcia leksykalne

```scheme
(define (inc n)
  (lambda (x) (+ x n)))
  
(map (inc 10) (list 1 2 3))
```

```scheme
(define plus2 (inc 2))
(map plus2 (list 1 2 3))
```

funkcja `inc` jest wyższego rzędu i dodatkowo
jest to domknięcie leksykalne.

```scheme
(define (counter)
  (let ((c 0))
     (lambda ()
        (set! c (+ c 1))
        c)))

(define counter_1 (counter))
(counter_1)
(counter_1)
(define counter_2 (counter))
(counter_2)
(counter_2)
(counter_2)
```

Funkcja która ma stan.

Wykrzyknik mówi że funkcja zmienia stan.
Aby zwócić uwagę poniewarz ma skutki uboczne
i nie jest to zwykła funkcja matematyczna.

## Implementacja Par za pomocą funkcji
```scheme
(define (mcons a b)
  (lambda (cmd)
    (if (equal? cmd 'car)
        a
        b)))

(define (mcar pair) (pair 'car))
(define (mcdr pair) (pair 'cdr))

(define (mlist . args)
  (if (null? args)
      nil
      (mcons (car args) (apply mlist (cdr args)))))
```

## Porty

## Makra lispowe

Makra higieniczne, nie będziemy ich omawiać.

```scheme
(define-macro (unless cond . body)
	`(if (not ,cond)
  		 (begin
				 	,@body)))

(let ((not (lambda (x) x)))
  (unless #t
    (display "This should not be printed!")
    (newline)))
```

W przypadku normalnych makr lispowych mając makro 
unless nie zadziała ono poprawnie, powyższe wyrażenie
nie powinno zadziałać. Jednak gdy unless jest niehigieniczne. Napis zostanie wyświetlony ponieważ
zmieniliśmy zachowanie makra z zewnątrz.

### cond
### case

(define-macro (case var . body)
	(let ((var-name (gensym)))
		`(case 

### Makro rekurencyjne

```scheme
(define-macro (let-- pairs . body)
    (if (null? pairs)
        `((lambda () ,@body))
        `((lambda (,(caar pairs))
            (let-- ,(cdr pairs) ,@body))
          ,(cadar pairs))))
```

## Strumienie

Iteratory `yield`.

