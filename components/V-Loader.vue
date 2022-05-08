<script setup>
const loader = ref(null);

const { gsap } = useGsap();
const emitter = useEmitter();

emitter.on('shader:running', () => {
  gsap.to(loader.value, {
    autoAlpha: 0,
    pointerEvents: 'none',
    onComplete: () => emitter.emit('loader:end'),
  });
});
</script>

<template>
  <div ref="loader" class="loader">
    <svg
      class="loader__svg"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_403_730)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M512.536 0.453735H0.536133V512.454H512.536V0.453735ZM238.837 302.555C241.945 297.72 243.499 292.253 243.499 286.152C243.499 278.67 241.427 272.109 237.283 266.468C233.254 260.828 227.729 256.972 220.707 254.9C226.232 252.367 230.549 248.511 233.657 243.331C236.765 238.151 238.319 232.511 238.319 226.41C238.319 221.23 237.168 216.281 234.865 211.561C232.678 206.727 229.455 202.813 225.196 199.82C221.052 196.712 216.103 195.158 210.347 195.158H151.296V317.749H209.139C215.354 317.749 221.052 316.426 226.232 313.778C231.527 311.015 235.729 307.274 238.837 302.555ZM228.65 272.684C230.491 276.137 231.412 279.936 231.412 284.08C231.412 288.109 230.376 291.907 228.304 295.476C226.347 298.929 223.7 301.749 220.362 303.936C217.023 306.123 213.282 307.217 209.139 307.217H163.383V260.77H210.347C214.376 260.77 217.944 261.864 221.052 264.051C224.275 266.238 226.808 269.116 228.65 272.684ZM163.383 250.928V205.691H206.549C210.347 205.691 213.743 206.727 216.736 208.799C219.729 210.87 222.088 213.633 223.815 217.086C225.542 220.425 226.405 224.166 226.405 228.31C226.405 232.223 225.484 235.907 223.642 239.36C221.801 242.813 219.326 245.633 216.218 247.821C213.11 249.892 209.541 250.928 205.513 250.928H163.383ZM266.293 195.331V317.749H278.379V280.109L301.344 256.281L348.135 317.749H361.776L309.113 249.029L359.186 195.158H345.891L278.379 266.468V195.331H266.293Z"
          fill="var(--surface-color)"
        />
      </g>
      <defs>
        <clipPath id="clip0_403_730">
          <rect
            width="512"
            height="512"
            fill="white"
            transform="translate(0.536133 0.453735)"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  pointer-events: all;

  &::after {
    --circle-size: 32%;

    content: '';

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;

    background: radial-gradient(
      circle at center,
      transparent var(--circle-size),
      var(--surface-color) calc(var(--circle-size) + 0.25%)
    );
    background-size: 100% 100%;
    background-position: 50% 50%;
  }

  &__svg {
    height: 100%;
    width: 100%;

    max-width: 100%;
    max-height: 100%;
  }

  &__text {
    position: absolute;
    top: 50%;
    left: 50%;

    margin: 0;

    transform: translate(-50%, -50%);

    &--primary {
      font-size: var(--step-5);

      color: transparent;
      -webkit-text-stroke: 1px white;
    }
  }
}
</style>
