window.addEventListener("load", () => {

    let _title = document.querySelector('#title')
    let _rating = document.querySelector('#rating')
    let _awards = document.querySelector('#awards')
    let _release = document.querySelector('#release')
    let _releaseError = document.querySelector('.dateError')
    let _length = document.querySelector('#length')
    let _genre = document.querySelector('#genre')
    let _genreError = document.querySelector('.genreError')
    let _form = document.querySelector('form')
    let message = document.querySelector('.message')

    let errors = []

    _title.focus()

    _title.addEventListener("blur", () => {
        switch (true) {
            case !_title.value.trim():
                _title.classList.add("is-invalid");
                _title.placeholder = "El campo es obligatorio";
                break;
            default:
                _title.classList.remove("is-invalid");
                _title.classList.add("is-valid");
                _title.placeholder = "";
        }
    })

    _rating.addEventListener("blur", () => {
        switch (true) {
            case !_rating.value.trim():
                _rating.classList.add("is-invalid");
                _rating.placeholder = "El campo es obligatorio";
                break;
            case _rating.value <= 0 || _rating.value > 10:
                _rating.classList.add("is-invalid");
                _rating.placeholder = "La calificación debe ser entre 1 y 10";
                let ratingError = {name: "Calificación", msg: _rating.placeholder };
                let errorFind = errors.find(error => error.name == ratingError.name)
                if(!errorFind){
                    errors.push(ratingError);
                }
                break;
            default:
                _rating.classList.remove("is-invalid");
                _rating.classList.add("is-valid");    
        }
    })

    _awards.addEventListener("blur", () => {
        switch (true) {
            case !_awards.value.trim():
                _awards.classList.add("is-invalid");
                _awards.placeholder = "El campo es obligatorio";
                break;
            case _awards.value <= 0 || _awards.value > 10:
                _awards.classList.add("is-invalid");
                _awards.placeholder = "Los premios deben ser entre 1 y 10";
                let awardsError = {name: "Premios", msg: _awards.placeholder };
                let errorFind = errors.find(error => error.name == awardsError.name)
                if(!errorFind){
                    errors.push(awardsError);
                }
                break;
            default:
                _awards.classList.remove("is-invalid");
                _awards.classList.add("is-valid");
                _awards.placeholder = "";
        }
    })

    _release.addEventListener("blur", () => {
        switch (true) {
            case !_release.value.trim():
                _release.classList.add("is-invalid");
                _releaseError.innerHTML = 'La fecha de creación no puede estar vacía'
                break;
            default:
                _releaseError.innerHTML = ''
                _release.classList.remove("is-invalid");
                _release.classList.add("is-valid");
        }
    })

    _length.addEventListener("blur", () => {
        switch (true) {
            case !_length.value.trim():
                _length.classList.add("is-invalid");
                _length.placeholder = "El campo es obligatorio";
                break;
            case _length.value < 60 || _length.value > 360:
                _length.classList.add("is-invalid");
                _length.placeholder = "La duración no puede ser menor a 60 ni mayor a 360 minutos.";
                _length.value = "";
                let lengthError = {name: "Duración", msg: _length.placeholder }
                let errorFind = errors.find(element => element.name == lengthError.name)
                if(!errorFind){
                    errors.push(lengthError);
                }
            default:
                _length.classList.remove("is-invalid");
                _length.classList.add("is-valid");
                _length.placeholder = "";
        }
    })

    _genre.addEventListener("blur", () => {
        switch (true) {
            case !_genre.value.trim():
                _genre.classList.add("is-invalid");
                _genreError.innerHTML = 'El género no puede estar vacío'
                break;
            default:
                _genreError.innerHTML = ''
                _genre.classList.remove("is-invalid");
                _genre.classList.add("is-valid");
        }
    })

    _form.addEventListener("submit", e => {
        e.preventDefault();
        let cont = 0;
        let formElements = _form.elements;

        for (let index = 0; index < formElements.length - 1; index++) {
            if (formElements[index].value == "") {
                formElements[index].classList.toggle("is-invalid");
                message.innerHTML = `Todos los campos son obligatorios`;

                cont++;
            }
        }

        if(errors.length != 0){
            cont++;
            document.querySelector(".errors").classList.add('alert-warning');
            errors.forEach(element => {
                document.querySelector(".errors").innerHTML += `<li>${element.name + ": " + element.msg}</li>`
            })
        }else {
            document.querySelector(".errors").innerHTML = "";
        }
        if(cont === 0){
            alert("Se guardó la película correctamente.")
            _form.submit();
        }
    })

})