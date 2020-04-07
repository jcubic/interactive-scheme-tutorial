# Interaktywny kurs języka Scheme Lisp

## Spis Treści

{{TOC}}

## Wstęp - co to jest Scheme

### Historia języka Lisp


Steve Russel na 

John McCarthy in 1958 MIT

Początkowo M-Expression

w postaci `car[cons[A,B]]`


(define (map fn x)
  (cond ((null? x) (quote ()))
        (#t (cons (fn (car x))
                 (map fn (cdr x))))))

(define (consall x ys)
  (map (lambda (y) (cons x y)) ys))
  
(consall 'beat '(harvard yale))
###


Trzeba się przyzwyczaić do nawiasów, ale po jakimś czasie nie ma z tym problemu.


Wszystko jest wywołaniem funkcji

ale zamiast fn(x) robi się (fn x)




Ponieżej proste wyrażenie:

```scheme
(+ 2 (* 4 5))
```

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
## Zmienne i typy danych

```scheme
(define x 10)
```

Dowolne znaki nawet +/*+ w jęzuku LISP i dialekcie
scheme nie ma operatorów tak jak w innych językach
zawsze jest to symbol który zawiera funkcje lub inny
obiekt który można wywołać.

## Funkcje / procedury

Aby zdefiniować funkcje piszemy:

```
(define (square x) (* x x)))
```

Jest to dokładnie to samo co:

```
(define square (lambda (x) (* x x)))
```

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

## Instrukcje warunkowe if

if wygląda jak funkcja ale nie jest to jednak
zwykła funkcje jest to wyrażenie specjalne.

Tak jak `define`.

### Wartości Logiczne

```scheme
#t
#f
```

### Operacje logiczne

eq? eqv? equal?


## Symbole
## Liczby (int float big num)

### Operacje na liczbach

(/ 1 2)
complex
float
integer



## Łańcuchy znaków

"this is \"quote\" string"

musimy użyć slasha aby wstawić cudzysłów wewnątrz ciągu znaków.

## Listy

```scheme
(define l (list 1 2 3))
(list? l)
(define l '(1 2 3))
```

quote

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

```scheme
(define l '(1 2 3))
(caddr l)
(car (cdr (cdr l)))
```

### Zwykłe Listy

```
list?
```

`sort`

`member`

### Drzewa
### Listy Asociacyjne

assoc

## Instrukcje warunkowe


nie ma else

begin wiele wyrażeń.

### cond
### case

(define-macro (case var . body)
	(let ((var-name (gensym)))
		`(case 

## Pętle

Język scheme nie pętli jako takich, zazwyczaj stosuje się
[rekurencje](#funkcje-rekurencyjne) w celu tworzenia pętli.
Można jednak utworzyć macro w celu stworzenia np. pętli `while` albo `for`.

### Funkcje rekurencyjne
Silnia
Metoda Hornera obliczania Wielomianów

```scheme
(define (sum . args)
  (if (null? args)
      0
      (+ (car args) (apply sum (cdr args)))))
```

### Rekurencja Ogonowa ????

TODO

### Funkcje wyższego rzędu (higher order procudure)

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

### Funkcje anonimowe

### Domknięcia leksykalne

```scheme
(define (inc n)
  (lambda (x) (+ x n)))
  
(map (inc 10) (list 1 2 3))
```

funkcja `inc` jest wyższego rzędu i dodatkowo
jest to domknięcie leksykalne.


## Eval
```scheme
(define s (list '+ 4 7))
(eval s)
```

## Kontynuacje

TODO:

## Porty

TODO: porty przez browserfs + service worker `__browserfs__`

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



