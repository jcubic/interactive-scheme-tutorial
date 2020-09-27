# Interaktywny Kurs Języka Scheme - Dialektu Lispa

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




Poniżej proste wyrażenie:

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

## Funkcje

```scheme
(define (foo x) x)
(define foo (lambda (x) x))
```

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

## Liczby

Wieża typów liczbowych (ang. numerical tower), nie każda implementacja języka
scheme obsługuje wszystkie rodzaje liczb. Nie jest to wymagane przez standard
języka Scheme.

```scheme
(/ 1 2)
1/2
10+10i
0.1
```

wymierne (rational), rzeczywiste (typu float), zespolone (complex).

```
exact?
inexact?
```

## Kod vs Dane

Cecha charakterystyczna języków Lisp
jest dualność kodu i danych.

```scheme
(+ 1 (* 2 3))
```

To jest kod, który oblicza wyrażenie artytmetyczne, poniżej to samo wyrażnie
ale jako dane (trzy sposoby zapisu):

```scheme
(list '+ (list '* 2 3))

(quote (+ 1 (* 2 3)))

'(+ 1 (* 2 3))
```

Pierwsze wyrażenie tworzy listę za pomocą funkcji list, każdy symbol, który
nie jest liczbą trzeba cytować. W trzecim przypadku użyto symbolu specjalnego
`'` jest on jednoznaczy (według specyfikacji języka Scheme) z drugim wyrażeniem.
Zazwyczaj jest to implementowane w ten sposób że symbol `'` jest rozwiajny do
postaci wywołania `quote`. Zobacz to wyrażenie

```scheme
''(+ 1 (* 2 3))
```

Podwójne cytowanie oznacza że zobaczymy co naprawde jest wynikiem cytowania.

Dane i kod są takim samym wyrażeniem
używają list, jedyna różnica jest taka, że dane nie są wykonywane. Tego typu dane można wywołąć za pomocą eval.

```scheme
(eval '(+ 1 (* 2 3)))
```

Dzięki temu można używać funkcji, które
operuja na listach i tworzyć wyrażenia,
które potem zostaną wywołane. Można pisać programy, które piszą programy.

Jest to główna siła mechanizmu, nazywana
Makrami.

### Para cons car cdr

```scheme
(define pair (cons 10 20))
(car pair)
;; ==> 10
(cdr pair)
;; ==> 20
(define l (cons 10 (cons 20 (cons 30 nil))))
;; ==> (10 20 30)
```

NOTE: nil jest to zmienna która oznacza pustą listę, zmienna może nie być zdefiniowana.
W takim wypadku wystarczy wywołać `(define nil '())`.

Parę można utworzyć także w inny sposób tak jak listy. 

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

Funkcja `append`:

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

```scheme
(define (square x) (* x x)))
```

Jest to dokładnie to samo co:

```scheme
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

Przypuśćmy, że musimy napisać funkcje które podwoi elementy w liście:

```scheme
(define (double-list l)
  (if (null? l)
      l
      (cons (* (car l) 2) (double-list (cdr l)))))

(double-list '(1 2 3))
;; => (1 4 6)
```

Przypuśćmy że potem musimy napisać funkcje które podniesie funkcje do potęgi drugiej.

```scheme
(define (square-list l)
  (if (null? l)
      l
      (cons (* (car l) (car l)) (square-list (cdr l)))))

(square-list '(1 2 3))
;; ==> (1 4 9)
```

Obie funkcje są prawie identyczne. Oto wygląd wzorca naszej funkcji:

```scheme
(define (<fn> l)
  (if (null? l)
      l
      (cons (<op> (car l)) (<fn> (cdr l)))))
```

Można zapisać to jako funkcję, która przyjmuje funkcję jako argument.
Funkcje które przyjmują inne funkcja jako argumenty i/lub zwracają funkcje
nazywane są funkcjami wyższego rzędu, ponieważ operują na funkcja jak wartościach.

Tak wygląda funkcja która generalizuje nasz wzorzec:

```scheme
(define (map <op> l)
  (if (null? l)
      l
      (cons (<op> (car l)) (map <op> (cdr l)))))

(map (lambda (x) (* x x)) '(1 2 3))
;; ==> (1 4 9)
```

Ponieważ funkcja ta jest tak uniwersalna i użyteczna jest ona częścią języka Scheme.
Wersja dostępna w scheme jest trochę bardziej rozbudowana ponieważ umożliwia
przekazanie więcej niż jednej listy.

```scheme
(map + '(1 2 3) '(2 3 4))
;; ==> (3 5 7)
```


Meta funkcje.

```scheme
(define (values alist) (map cdr alist))
(define (keys alist) (map car alist))
(define (make-alist keys values) (map cons keys values))
```

Inne użyteczne funkcje wyższego rzędu:


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
jest to domknięcie leksykalne, ponieważ funkcja ma dostęp do zmiennej n,
która jest zdefiniowana na zewnątrz funkcji lambda.

Funkcję inc można także zapisać w ten sposbób:


```scheme
(define (inc n)
   (define (fn x) (+ x n))
   fn)
```

Ponieżej funkcja która zmienia zmienną która jest w domknięciu.

```scheme
(define (counter)
  (let ((c 0))
     (lambda ()
        (set! c (+ c 1))
        c)))

(define counter_1 (counter))
(counter_1)
;; ==> 1
(counter_1)
;; ==> 2
(define counter_2 (counter))
(counter_2)
;; ==> 1
(counter_2)
;; ==> 2
(counter_2)
;; ==> 3
```

Domknięcie jest to funkcja, która ma stan, który może zmianiać.
Domknięcia działają podobnie do obiektów i klas w językach obiektowych.

Zróć uwagę na wykrzyknik (w funkcji `set!`), mówi on, że funkcja zmienia coś.
Trzeba na to zwracać uwagę używając takich fukcji ponieważ mają one skutki
uboczne i nie są funkcjami matematycznymi (czyli nie są czystymi funkcjami).
Ważne jest także (jest to taka konwencja) aby własne funkcje które mają
skutki uboczne także oznaczać wykrzyknikiem.

### Implementacja Par za pomocą funkcji

Dzięki domknięciom można stworzyć konstrukcje, które będą tworzyły pary (cons).
Tak jak domyślna funkcja z języka Scheme. Oto przykła takiego kodu:


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

Aby wyświetlić taką listę trzeba trochę więcej kodu:

```scheme
(define (any->string obj)
  (cond ((number? obj) (number->string obj))
        ((pair? obj) (pair->string obj))))

(define (pair->string pair . rest)
  (let ((nested (if (null? rest) #f (car rest))))
    (if (null? pair)
        (if nested
            ""
            "()")
        (let* ((item (any->string (mcar pair)))
               (rest (mcdr pair))
               (sep (if (null? rest) "" " ")))
          (if (not nested)
              (string-append "("
                             item
                             sep
                             (pair->string rest #t)
                             ")")
              (string-append item sep (pair->string rest nested)))))))
```

Zauważ że funkcja nie zadziała dla wyrażenia

```scheme
(pair->string (mcons 1 2))
```

Jako cwiczenie możesz spróbować dodać obsługę par, dzięki temu będzie można,
wyświetlać dowolne trzewa binarne stworzone za pomocą komórek `mcons`.

### Obiekty za pomocą domknięć

```scheme
(define (make-person name age)
   (lambda (method . args)
      (case method
         ((get-name) name)
         ((set-name) (set! name (car args)))
         ((get-age) age)
         ((set-age) (set! age (car args))))))

(define P (make-person "John" 26))
(P 'get-name)
;; ==> "John"
(P 'get-age)
;; ==> 26
(P 'set-name "Mike")
(P 'get-name)
;; ==> "Mike"
```

## Porty

## Makra lispowe

Język scheme nie ma pętli for. W prawie każdym nowoczesnym języku mamy konstrukcje tego typu jak np. język C, Java czy JavaScript.

```javascript
for (var i = 0; i < 10; ++i) {

}
```

Mimo że język scheme nie ma tego typu konstrukcji, bardzo prosto jest ją
dodać. Wystarczy użyć konstrukcji nazywaną makrem, które działa
jak funkcja ale scheme zamiast obliczyć poszczególne argumenty i przekazać
je do makra, jak to ma miejsce w przypadku funkcji przekazuje do makra
kod w postaci danych, te dane mogą następnie być przetworzone i wynikowe
dane są wywoływane przez interpreter języka Scheme (zazwyczaj na etapie
kompilacji).


Przykład, przypuśćmy że mamy macro `for`, które zaraz napiszemy:

```scheme
(for (i 0 10)
     (display i))
```

Jeśli `for` jest to makro a nie funkcja, interpreter nie wywoła funkcji o nazwie
`i` i nie przekaże wyniku tej funkcji, ale dostanie takie wyrażenie:

```scheme
'((i 0 10) (display i))
```

Makro może dowolnie przetworzyć te dane i to co zwróci zostanie wywołane,
więc wewnątrz makra możemy utworzyć pętlę używają konstrukcji, które mamy
dostępne, np. nazwanego let albo zwykłej funkcji rekurencyjnej.

### Etapy tworzenia makra

Makro można sobie rozdzielić na kilka etapów. Można zapisać sobie
listę wejściowa jako dane i przetworzyć ją tak aby uzyskać kod jaki chcemy.

Przykład:

Za pomocą konstrukcji `quasiquote` można utworzyć kod jako listę:

```scheme
(map (lambda (pair)
         `(define ,(car pair) ,(cadr pair)))
   '((foo 10) (bar 20)))
;; ==> ((define foo 10) (define bar 20))
```

Makro zawsze musi zwrócić jedno wyrażenie więc trzeba opakować je w `begin`:

```scheme
`(begin
   ,@(map (lambda (pair)
             `(define ,(car pair) ,(cadr pair)))
          '((foo 10) (bar 20))))

;; ==> (begin (define foo 10) (define bar 20))
```

Można to uprościć w ten sposób:

```scheme
`(begin
     ,@(map (lambda (pair) `(define ,@pair))
            '((foo 10) (bar 20))))

```

Aby utworzyć macro wystarczy użyć konstrukcji `define-macro` i wstawić
nasz kod wewnątrz.


```scheme
(define-macro (deflet pairs)
  `(begin
     ,@(map (lambda (pair) `(define ,@pair))
            pairs)))
```

Teraz można wywołać takie makro:

```scheme
(deflet ((foo 10) (bar 20)))
```

I mamy konstrukcję podobną do `let`, która wywołuje `define`.

Przykład 2:

```scheme
(define-macro (for loop . body)
   `(let iter ((,(car loop) ,(cadr loop)))
       (if (<= ,(car loop) ,(caddr loop))
          (begin
             ,@body
             (iter (+ ,(car loop) 1))))))
```

teraz można go użyć:

```scheme
(for (i 1 10)
  (display i)
  (newline))
```

Problem z tą konstrukcją jest taki, że kod wewnętrzny makra wycieka na zewnątrz.
Rozważ poniższy kod:

```scheme
(let ((iter (lambda (x) x)))
    (for (i 1 10)
       (display (iter i))
       (newline)))
```

Spowoduje to zawieszenie się programu ponieważ mając `(iter i)` nie wywołujemy
naszej funkcji tylko nazwany let wewnątrz makra. Czasami tego typu makra są
użyteczne (nazywają się makrami anaforycznymi), ale w tym przypadku jest to
niepożądane. Aby to rozwiązać wystarczy nadać naszej nazwie identyfikator
który zawsze będzie unikalny. Robi się to za pomocą funkcji `gensym`.

```scheme
(define-macro (for loop . body)
   (let ((name (gensym)))
     `(let ,name ((,(car loop) ,(cadr loop)))
         (if (<= ,(car loop) ,(caddr loop))
            (begin
               ,@body
               (,name (+ ,(car loop) 1)))))))
```

Wywołujemy kod (`let` z nazwą) zanim zwrócimy wynikową listę i wstawiamy tą nazwę, tam
gdzie trzeba.

Teraz możesz sprawdzić że to zadziała:

```scheme
(let ((iter (lambda (x) (- x 1))))
   (for (i 1 10)
        (display (iter i))
        (newline)))
```

Niestety nie zadziała to w każdym przypadku ponieważ mamy jeszcze takie konstrukcje
jak `let,` `if` oraz `begin` które można nadpisać:

```scheme
(let ((begin (lambda ())))
   (for (i 1 10)
        (display i)
        (newline)))
```

Powyższy kod nie wyświetli nic. Okazuje się że w języku Scheme jest konstrukcja
która umożliwia obejście tego ograniczenia. Są nią makra higieniczne.


Poniżej jeszcze jeden przykład, trochę mało użyteczny, ale pokazuje jak można modyfikować kod:

```scheme
(define (tree-map f tree)
  "(tree-map fn tree)

   Tree version of map. Function is invoked on every leaf."
  (if (pair? tree)
      (cons (tree-map f (car tree)) (tree-map f (cdr tree)))
      (f tree)))

(define-macro (funky expr)
   (tree-map (lambda (x)
               (if (and (symbol? x) (eq? x '+)) '- x))
             expr))

(funky (+ 2 (+ 3 4)))
```

Makro funky modyfikuje kod, który do niego przekazujemy i zmienia wszystkie plusy na
minusy. W taki sam sposób możesz modyfikować kod wejściowy przekazany do makra w dowolny
sposób. Zauważ że nie ma wewnątrz makra cytowania, nie jest ono wymagane. Wymagane jest
tylko to aby zwracać kod pod postacią danych, w tym przypadku już dostajemy kod, który
modyfikujemy.

### cond
### case

```scheme
(define-macro (case var . body)
	(let ((var-name (gensym)))
		`(case 
```

### Makro rekurencyjne

```scheme
(define-macro (let-- pairs . body)
    (if (null? pairs)
        `((lambda () ,@body))
        `((lambda (,(caar pairs))
            (let-- ,(cdr pairs) ,@body))
          ,(cadar pairs))))
```

## Makra higieniczne

Makra higieniczne zdefiniowane w standadzie R5RS można utworzyć za pomocą,
wyrażenie `syntax-rules` oraz jednego z wyrażeń które definiują makro
tj. `define-syntax`, `let-syntax` lub `letrec-syntax`.

Przykład makra `for`:

```scheme
(define-syntax for
  (syntax-rules ()
     ((_ (var start end) body ...)
      (let loop ((var start))
         (if (<= var end)
             (begin
                body ...
                (loop (+ var 1))))))))
```

Różnica między makrami lispowymi a makrami higienicznymi jest taka, że używają
języka wzorców (pattern language, pattern matching). Higieniczność jest zazwyczaj
realizowana w taki sposób że wszystkie wolne symbole zostają zminione na inne
nazwy, które nie powodują konfliktów. Można to osiągnąć np. poprzez zmianę nazw
wszystkich tych symboli na wartości gensym.

Zbacz wynik tego wyrażenia:

```scheme
(let ((begin (lambda ()))
      (loop (lambda (i)
               (display i)
               (newline))))
  (for (i 1 10)
       (loop i)))
```

Wynik będzie taki jak oczekujemy.

Inny przykład:

```scheme
(define numbers (let ((var '()))
                  (for (i 0 10)
                       (set! var (cons i var)))
                  (reverse var)))
(display numbers)
```

Mimo że zmienna var jest użyta wewnątrz definicji makra, możemy ją swobodnie używać
gdy używamy makra.

Makro syntax-rules definijuemy w ten spsób:

Pierwszy argument jest opcjionalny (nie wszystkie implementacje go obsługują.
Jest to rozszerzenie makr syntax-rules, które jest zefiniowane w dokumencie
[SRFI-46](https://srfi.schemers.org/srfi-46/srfi-46.html), dokumenty te zawierają
rozszerzenia języka, które moga być zaimplementowane przez implementecja.
SRFI to skrót od Scheme Requests for Implementation).

Można użyć tego rozszerzenia, aby zmienić symbol trzech kropek np.

```scheme
(define-syntax for
  (syntax-rules ::: ()
     ((_ (var start end) body :::)
      (let loop ((var start))
         (if (<= var end)
             (begin
                body :::
                (loop (+ var 1))))))))
```

W makrach higieniczny (typu `syntax-rules`) trzy kropki oraz symbol przed nimi
są specjalnym znacznikiem, który działa podobnie do `,@` z makr lispowych
ale odwrotnie. Wewnątrz zmiennej `body ...` (to wyrażnie trzeba traktować jak
pojedyncza zmienna) znajdzie się lista wyrażeń. Wstawiając to wyrażenie
w wynikowym rozwinięciu makra zostaje ono wstawione tak jakby było użyte `,@`.

Drugim argumentem `syntax-rules`, jest lista symboli specjalnych, które nie zostaną
przetworzone przez makro, mogą one pojawić się w wywołaniu makra. Można je
traktować jako stałe operatory. Zazwyczaj lista jest pusta.

```scheme
(define-syntax for
  (syntax-rules (==>)
     ((_ (var start ==> end) body ...)
      (let loop ((var start))
         (if (<= var end)
             (begin
                body ...
                (loop (+ var 1))))))))
```

Takie makro wywołujemy w ten sposób:

```scheme
(let ((begin (lambda ())))
   (for (i 1 ==> 10)
        (display i)
        (newline)))
```

Główną częścią makra jest ciało, czyli lista par wejscie - wyjście:

Pierwsze wyrażenie jest to lista wejściowa, a jego pierwszy symbol jest to nazwa
makra, może być dowolna zazwyczaj stosuje się nazwę makra albo symbol `_`. Następnie
mamy wzorzec wejściowy, który zostanie dopasowany do wywołania makra.
Drugi element listy jest to wynikowy kod makra czyli to co zostanie wywołane
gdy wzorzec zostanie dopasowany. Wewnątrz jednego makra można definiować wiele
wzorców, np.:

```scheme
(define-syntax for
  (syntax-rules (==>)
     ((_ (var start end) body ...)
      (_ (var start ==> end) body ...))
     ((_ (var start ==> end) body ...)
      (let loop ((var start))
         (if (<= var end)
             (begin
                body ...
                (loop (+ var 1))))))))
```

Powyższe makro zawiera definicje rekurencyjną, gdy wywołujemy makro bez operatora
`==>` zostanie wywołane makro z dodanym operatorem. Dzięki temu, że nazwa
makra jest zapisana jako `_` można go użyć w wynikowym rozwinięciu makra.
Dlatego aby zmienić nazwę makra wystarczy zmienić symbol w wyrażeniu `define-syntax`.

## Strumienie

Iteratory `yield`.

