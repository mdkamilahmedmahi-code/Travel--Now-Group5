$(document).ready(function(){

  /* =============================
     IMAGE SLIDER (AUTO 3 SEC)
  ============================= */
  $(document).ready(function(){

  let index = 0;
  const images = $('.slider img');

  function showSlide() {
    images.removeClass('active');
    images.eq(index).addClass('active');
    index = (index + 1) % images.length;
  }

  setInterval(showSlide, 3000);

});


  /* =============================
     TESTIMONIAL ROTATION
  ============================= */
  const testimonials = [
    "Amazing service and easy booking!",
    "Best travel website ever!",
    "Affordable and reliable!"
  ];

  let tIndex = 0;

  setInterval(function(){
    tIndex = (tIndex + 1) % testimonials.length;

    $('.testimonial-text').fadeOut(function(){
      $(this).text(testimonials[tIndex]).fadeIn();
    });

  }, 4000);


  /* =============================
     BUTTON HOVER EFFECT
  ============================= */
  $('button').hover(
    function(){
      $(this).css('transform', 'scale(1.1)');
    },
    function(){
      $(this).css('transform', 'scale(1)');
    }
  );


  /* =============================
     SCROLL TO TOP FIX
  ============================= */
  $('a[href="#"]').click(function(e){
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 800);
  });


  /* =============================
     AUTH SYSTEM (LOGIN / SIGNUP)
  ============================= */
  let isLogin = true;

  // OPEN LOGIN
  $('#loginBtn').click(function(){
    $('.auth-modal').fadeIn();
    $('#authTitle').text('Sign In');
    $('#toggleText').html(`Don't have an account? <span id="toggleAuth">Sign Up</span>`);
    isLogin = true;
  });

  // OPEN SIGNUP
  $('#signupBtn').click(function(){
    $('.auth-modal').fadeIn();
    $('#authTitle').text('Sign Up');
    $('#toggleText').html(`Already have an account? <span id="toggleAuth">Sign In</span>`);
    isLogin = false;
  });

  // CLOSE MODAL
  $('.close').click(function(){
    $('.auth-modal').fadeOut();
  });

  // TOGGLE LOGIN/SIGNUP
  $(document).on('click', '#toggleAuth', function(){

    isLogin = !isLogin;

    if(isLogin){
      $('#authTitle').text('Sign In');
      $('#toggleText').html(`Don't have an account? <span id="toggleAuth">Sign Up</span>`);
    } else {
      $('#authTitle').text('Sign Up');
      $('#toggleText').html(`Already have an account? <span id="toggleAuth">Sign In</span>`);
    }

  });

  // SUBMIT LOGIN / SIGNUP
  $('#authSubmit').click(function(){

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();

    if(email === '' || password === ''){
      alert('Please fill all fields');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if(isLogin){

      // LOGIN
      const user = users.find(u => u.email === email && u.password === password);

      if(user){
        alert('Login successful!');
        localStorage.setItem('loggedInUser', email);
        $('.auth-modal').fadeOut();
      } else {
        alert('Invalid email or password');
      }

    } else {

      // SIGNUP
      const exists = users.find(u => u.email === email);

      if(exists){
        alert('User already exists');
        return;
      }

      users.push({ email: email, password: password });
      localStorage.setItem('users', JSON.stringify(users));

      alert('Signup successful! Now login.');
    }

  });

});

// About page
$(document).ready(function(){

  $('.about-content, .stats, .team').hide().fadeIn(1500);

  $('.stat-box h2').each(function(){
    let $this = $(this);
    let countTo = $this.text().replace('+','');

    $({countNum: 0}).animate({
      countNum: countTo
    },
    {
      duration: 2000,
      easing: 'swing',
      step: function(){
        $this.text(Math.floor(this.countNum) + '+');
      },
      complete: function(){
        $this.text(this.countNum + '+');
      }
    });
  });

});

// Services page
$(document).ready(function(){

  $('.service-card').hide().each(function(i){
    $(this).delay(200 * i).fadeIn(800);
  });

  $('.cta button').hover(function(){
    $(this).css('transform', 'scale(1.1)');
  }, function(){
    $(this).css('transform', 'scale(1)');
  });

});

// Contact page
$(document).ready(function(){

  $('#contactForm').submit(function(e){
    e.preventDefault();

    let name = $('#name').val().trim();
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();
    let message = $('#messageBox').val().trim();

    if(name === '' || email === '' || password === '' || message === ''){
      $('#message').text('Please fill all fields');
      return;
    }

    if(!email.includes('@')){
      $('#message').text('Enter a valid email');
      return;
    }

    if(password.length < 6){
      $('#message').text('Password must be at least 6 characters');
      return;
    }

    $('#message').css('color', 'lightgreen').text('Message sent successfully!');
    $('#contactForm')[0].reset();
  });

  $('.contact-box').hide().fadeIn(1200);

});