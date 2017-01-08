(function($) {
  const panel = $('.panel');
  const text = $('.text');

  const animationIn = 'slideInLeft';
  const animationOut = 'slideOutLeft';

  const values = {
    'all_time_top_donator': {
      value: '',
      img: '/img/top.png'
    },
    'monthly_top_donator': {
      value: '',
      img: '/img/top.png'
    },
    'most_recent_donator': {
      value: '',
      img: '/img/top.png'
    },
  };

  // SEGUNDOS QUE PERMANECE EL SLIDE
  const duration = 1;

  // SEGUNDOS ENTRE SLIDES
  const betweenSlides = 1;

  let index = -1;
  let current = getNextPanel();

  function getNextPanel() {
    index++;
    if (index >= Object.keys(values).length) index = 0;
    return values[Object.keys(values)[index]];
  }

  function reloadData() {
    const files = Object.keys(values);
    Promise.all(files.map((k) => axios.get(`/file/${k}.txt`)))
    .then((res) => {
      files.forEach((key, i) => values[key].value = res[i].data);
      show();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  function show() {
    $(text).text(current.value);
    $(panel)
      .css({backgroundImage: `url(${current.img})`})
      .removeClass(animationOut)
      .addClass(animationIn);
    setTimeout(() => {
      $(panel)
        .removeClass(animationIn)
        .addClass(animationOut);
      setTimeout(() => {
        current = getNextPanel();
        reloadData();
        }, 1000 + (betweenSlides * 1000));
      }, 1000 + (duration * 1000));
  }

  reloadData();

})(jQuery)