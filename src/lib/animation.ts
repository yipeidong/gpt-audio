
const animations = [] as Animation[];

export const move_to = (ele: Element, x: string, y: string, during: number, onfinished?: () => void, oncancel?: () => void) => {
  if(!(ele instanceof HTMLElement)) return;

  const curr_left = ele.style.left || '0';
  const curr_top = ele.style.top || '0';

  const anim = ele.animate(
    [
      {
        left: curr_left,
        top: curr_top
      },
      {
        left: x === 'self' ? curr_left : x,
        top: y === 'self' ? curr_top: y
      }
    ],
    {
      duration: during,
      fill: 'forwards'
    }
  );
  animations.push(anim);

  anim.onfinish = () => {
    ele.style.left = x;
    ele.style.top = y;
    animations.splice(animations.indexOf(anim), 1);
    onfinished?.();
  };

  anim.oncancel = () => {
    ele.style.left = x;
    ele.style.top = y;
    animations.splice(animations.indexOf(anim), 1);
    oncancel?.();
  }

  return anim;
}


export const zoom = (ele: Element, width: string, height: string, radius: string, during: number, onfinished?: () => void, oncancel?: () => void) => {
  if(!(ele instanceof HTMLElement)) return;

  const curr_width = ele.style.width || '0';
  const curr_height = ele.style.height || '0';
  const curr_radius = ele.style.borderRadius || '0';

  const anim = ele.animate(
    [
      {
        width: curr_width,
        height: curr_height,
        borderRadius: curr_radius
      },
      {
        width: width === 'self' ? curr_width : width,
        height: height === 'self' ? curr_height : height,
        borderRadius: radius === 'self' ? curr_radius : radius
      }
    ],
    {
      duration: during,
      fill: 'forwards'
    }
  );

  animations.push(anim);

  anim.onfinish = () => {
    ele.style.width = width;
    ele.style.height = height;
    ele.style.borderRadius = radius;
    animations.splice(animations.indexOf(anim), 1);
    onfinished?.();
  }

  anim.oncancel = () => {
    ele.style.width = width;
    ele.style.height = height;
    ele.style.borderRadius = radius;
    animations.splice(animations.indexOf(anim), 1);
    oncancel?.();
  }

  return anim;
}

export const amp1 = (ele: Element, rate: number, during: number, onfinished?: () => void) => {
  if(!(ele instanceof HTMLElement)) return;

  const curr_width = ele.style.width || '0';
  const curr_height = ele.style.height || '0';
  const curr_radius = ele.style.borderRadius || '0';

  const height_n = parseInt(curr_height) * rate;
  const height = (height_n > 40 ? 40 : height_n) + 'vw';

  zoom(ele, curr_width, height, curr_radius, during * 0.1, () => {
    zoom(ele, '20vw', '30vw', 'self', during * 0.9, () => {
      onfinished?.();
    });
  });
}

export const amp2 = (ele: Element, rate: number, during: number, onfinish?: () => void) => {
  if(!(ele instanceof HTMLElement)) return;

  const curr_width = ele.style.width || '0';
  const curr_height = ele.style.height || '0';
  const curr_radius = ele.style.borderRadius || '0';

  const width_n = parseInt(curr_width) * rate;
  const height_n = parseInt(curr_height) * rate;
  const width = (width_n > 86 ? 86 : height_n) + 'vw';
  const height = (height_n > 86 ? 86 : height_n) + 'vw';

  zoom(ele, width, height, curr_radius, during * 0.1, () => {
    zoom(ele, '70vw', '70vw', 'self', during * 0.9, () => {
      onfinish?.();
    });
  });
}

export const to_circle = (ele: Element, radius: number, index: number, during: number, onfinish?: () => void, oncancel?: () => void) => {
  if(!(ele instanceof HTMLElement)) return;

  const curr_width = ele.style.width || '20vw';
  // const curr_height = ele.style.height || '20vw';
  // const curr_radius = ele.style.borderRadius || '50%';
  ele.style.width = '20vw';
  ele.style.height = '30vw';
  ele.style.borderRadius = '10vw';

  const curr_left = ele.style.left || '50vw';
  const curr_top = ele.style.top || '50vw';
  ele.style.left = curr_left;
  ele.style.top = curr_top;

  const width_n = parseFloat(curr_width);

  const CircleAngle = 6.2;
  const init_left = 50 + radius * Math.cos((CircleAngle*index)/5);
  const init_top = 50 + radius * Math.sin((CircleAngle*index)/5);

  move_to(ele, init_left+'vw', init_top+'vw', 200);
  const init_ani = zoom(ele, '40vw', '40vw', '50%', 200);

  const path = [] as { left: string, top: string, width: string, height: string, borderRadius: string }[];
  const offset = index*(CircleAngle/5);
  for(let a = offset, sa = offset; a < CircleAngle * 10 + offset; a+=0.02, sa+=0.05) {
    const left = 50 + radius * Math.cos(a);
    const top = 50 + radius * Math.sin(a);
    let size = (width_n*2) * (1-Math.cos(sa)*0.1);
    if(size < 0) size *= -1;
    path.push({ left: left+'vw', top: top+'vw', width: size + 'vw', height: size + 'vw', borderRadius: '50%' });
  }

  if(!init_ani) return;
  init_ani.onfinish = () => {
    const ani = ele.animate(
      path,
      {
        duration: during,
        fill: 'forwards'
      }
    );
    animations.push(ani);

    ani.onfinish = () => {
      if(index === 5) {
        const ani = ele.animate(
          [
            {},
            {width: '0', height: '0'}
          ],
          {
            duration: 100,
            fill: 'forwards'
          }
        );
        ani.onfinish = () => onfinish?.();
        return;
      }
      onfinish?.();
    }

    ani.oncancel = () => {
      if(index === 5) {
        const ani = ele.animate(
          [
            {},
            {width: '0', height: '0'}
          ],
          {
            duration: 100,
            fill: 'forwards'
          }
        );
        ani.oncancel = () => oncancel?.();
        return;
      }
      oncancel?.();
    }
  }
}

export const cancel_animations = (action?: () => void) => {
  for(let anim of animations) anim.cancel();

  if(!action) return;
  setTimeout(() => cancel_animations(), 50);
  setTimeout(() => action(), 50);
}