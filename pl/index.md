# Interaktywny kurs języka Scheme

## Spis Treści

{{TOC}}

## Wstęp - co to jest Scheme

Wszystko jest wywołaniem funkcji

ale zamiast fn(x) robi się (fn x)




Ponieżej proste wyrażenie:

```scheme
(+ 2 (* 4 5))
```

Wszystkie wyrażenia w języku LISP są to listy



+(2, *(4, 5))


## Komentarze

```scheme
;;;
```
## Zmienne i typy danych

Dowolne znaki nawet +/*+ w jęzuku LISP i dialekcie
scheme nie ma operatorów tak jak w innych językach
zawsze jest to symbol który zawiera funkcje lub inny
obiekt który można wywołać.

## Wartości Logiczne

```scheme
#t
#f
```


### Symbole
### Liczby (int float big num)

## Operacje na liczbach

(/ 1 2)
complex
float
integer

## Operacje logiczne

eq? eqv? equal?

### Łańcuchy znaków

"this is \"quote\" string"

musimy użyć slasha aby wstawić cudzysłów wewnątrz ciągu znaków.

### Para cons car cdr
#### Zwykłe Listy

```
list?
```
member

#### Drzewa
#### Listy Asociacyjne

assoc

## Instrukcje warunkowe
### if

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

## Funkcje / procedury



### Funkcje rekurencyjne
Silnia
Metoda Hornera obliczania Wielomianów

### Rekurencja Ogonowa ????

TODO

### Funkcje wyższego rzędu (higher order procudure)

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

```
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



