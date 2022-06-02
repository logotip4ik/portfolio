<script setup>
import SplitType from 'split-type';

const { gsap } = useGsap();
const emitter = useEmitter();

const title = ref(null);

function showTitle() {
  if (!title.value.querySelector('.project-title__line')) return;

  const revealRef = gsap.timeline({
    defaults: { ease: 'expo.out' },
    onStart: () => emitter.off('overlay:hiding', showTitle),
  });

  revealRef.fromTo(
    '.project-title__line',
    { yPercent: 105 },
    { yPercent: 0, stagger: 0.1, duration: 1 }
  );

  revealRef.fromTo(
    '.project-title__line__wrapper',
    { y: 40 },
    { y: 0, stagger: 0.075, duration: 1 },
    0.1
  );
}

onMounted(() => {
  const text = new SplitType(title.value, {
    types: 'lines',
    lineClass: 'project-title__line',
  });

  for (const line of text.lines) {
    const lineParent = line.parentNode;
    line.remove();

    const wrapper = document.createElement('div');
    wrapper.classList.add('project-title__line__wrapper');

    lineParent.appendChild(wrapper);
    wrapper.appendChild(line);
  }

  gsap.set(text.lines, { yPercent: 105 });
  gsap.set('.project-title__line__wrapper', { y: 40 });
});

emitter.on('overlay:hiding', showTitle);
</script>

<template>
  <h1 ref="title" class="project-title" data-scroll>
    <Markdown :use="$slots.default" :unwrap="true" />
  </h1>
</template>

<style lang="scss">
.project-title {
  font-weight: 200;

  max-width: 90vh;

  color: var(--ff-color);

  margin: 0;
  margin-bottom: 0.75rem;

  &__line {
    line-height: 1.225;

    &__wrapper {
      overflow: hidden;
    }
  }
}
</style>
