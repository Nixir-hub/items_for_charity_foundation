document.addEventListener("DOMContentLoaded", function() {
  /**
   * HomePage - Help section
   */

  class Help {
    constructor($el) {
      this.$el = $el;
      this.$buttonsContainer = $el.querySelector(".help--buttons");
      this.$slidesContainers = $el.querySelectorAll(".help--slides");
      this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
      this.init();
    }
    validate(){
      if( document.myForm.categories.checked === None ) {
        alert( "Please choose any category!" );
        document.myForm.categories.focus() ;
        return false;
        }
        if( document.myForm.bags.value === "" || isNaN( document.myForm.bags.value ) ) {
          alert( "Please provide quantity of bags!" );
          document.myForm.bags.focus() ;
          return false;
        }
        if( isNaN(document.myForm.organization.checked)) {
          alert( "Please choose one organization." );
          document.myForm.organization.focus() ;
          return false;
        }
        if( document.myForm.post_code.value == "" || isNaN( document.myForm.post_code.value ) ||
          document.myForm.post_code.value.length != 5 ) {
          alert( "Please provide a zip in the format #####." );
          document.myForm.post_code.focus() ;
          return false;
        }
        if( document.myForm.address.value == "" ) {
          alert( "Please provide your country!" );
          document.myForm.address.focus() ;
          return false;
        }
        if( document.myForm.city.value == "" ) {
          alert( "Please provide your city!" );
          document.myForm.city.focus() ;
          return false;
        }
        if( document.myForm.phone.value == "" || isNaN( document.myForm.phone.value ) ||
          document.myForm.phone.value.length != 8) {
          alert( "Please provide your phone!" );
          document.myForm.phone.focus() ;
          return false;
        }
        if(  isNaN( document.myForm.data.value )) {
          alert( "Please provide data!" );
          document.myForm.data.focus() ;
          return false;
        }
        if( isNaN( document.myForm.time.value )) {
          alert( "Please provide time!" );
          document.myForm.time.focus() ;
          return false;
        }
          return true;
    }
    init() {
      this.events();
    }

    events() {
      /**
       * Slide buttons
       */
      this.$buttonsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("btn")) {
          this.changeSlide(e);
          this.validate();
        }
      });

      /**
       * Pagination buttons
       */
      this.$el.addEventListener("click", e => {
        if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
          this.changePage(e);
        }
      });
    }

    changeSlide(e) {
      e.preventDefault();
      const $btn = e.target;

      // Buttons Active class change
      [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
      $btn.classList.add("active");

      // Current slide
      this.currentSlide = $btn.parentElement.dataset.id;

      // Slides active class change
      this.$slidesContainers.forEach(el => {
        el.classList.remove("active");

        if (el.dataset.id === this.currentSlide) {
          el.classList.add("active");
        }
      });
    }

    /**
     * TODO: callback to page change event
     */
    changePage(e) {
      e.preventDefault();
      const page = e.target.dataset.page;

      console.log(page);
    }
  }
  const helpSection = document.querySelector(".help");
  if (helpSection !== null) {
    new Help(helpSection);
  }

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;

      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();
          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {

      this.$step.innerText = this.currentStep;

      // TODO: Validation

      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }

      });
      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
      this.$step.parentElement.hidden = this.currentStep >= 6;

      // TODO: get data from inputs and show them in summary
      let categories = document.querySelectorAll('input[name="categories"]:checked');
      let cat_lst = Array.from(categories)
      // let foundation_container = document.querySelectorAll('input[name="organization"]');
      let foundation = document.querySelector('input[name="organization"]:checked').value;
      let street = document.getElementById("adres")
      let city = document.getElementById("city")
      let post_code = document.getElementById("post_code")
      let phone_n = document.getElementById("phone_n")
      let pick_up_date = document.getElementById("pick_up_date")
      let pick_up_hour = document.getElementById("pick_up_hour")
      let for_delivery = document.getElementById("for_delivery")
      let bags = document.getElementById("bags")
      console.log(cat_lst)
      form.addEventListener("click", function (){
          document.getElementById("bags_quantity").innerHTML = bags.value + " worków z darami"
          document.getElementById("foundation_name").innerHTML = 'Dla fundacji "' + foundation + '"'
          document.getElementById("adres_out").innerHTML = "ulica " + street.value
          document.getElementById("city_out").innerHTML = city.value
          document.getElementById("post_code_out").innerHTML = post_code.value
          document.getElementById("phone_n_out").innerHTML = phone_n.value
          document.getElementById("pick_up_out").innerHTML = pick_up_date.value
          document.getElementById("time_out").innerHTML = pick_up_hour.value
          document.getElementById("for_deliver_out").innerHTML = for_delivery.value
      })
    }

    /**
     * Submit form
     *
     * TODO: validation, send data to server
     */
    submit() {
      this.currentStep++;
      this.updateForm();

    }
  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});
const divGet = document.getElementById("menu_roll")
const dropMenu = document.getElementById("sub_menu")
const mainUlGet = divGet.children[0].children
const containerUl = Array.from(mainUlGet)

console.log(containerUl)

containerUl.forEach(function (listElem,index){
    if (mainUlGet[index].children.length !== 0) {
        mainUlGet[index].children[0].style.display = ""
        listElem.addEventListener("click", function (event) {
            dropMenu.style.display = ""
            console.log(this.innerText)

        })
        listElem.addEventListener("dblclick", function (event) {
            dropMenu.style.display = "none"
            console.log(this.innerText)
        })
    }else{
        listElem.addEventListener("click", function (event) {
            console.log(this.innerText)

        })
        listElem.addEventListener("click", function (event) {
            console.log(this.innerText)
        })
    }
})
