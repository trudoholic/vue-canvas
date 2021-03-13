
<template>
  <div>
	<canvas id="canvas" width="480" height="320">Обновите браузер</canvas>
	<header id="header">
	  <div id="bar" />
	  <input @change="previewFiles" id="inputfile" type="file" multiple />
	  <div id="radio">
	    <input id="rb0" type="radio" value="modeBoth" v-model="mode"><label for="rb0">целиком</label>
	    <input id="rb1" type="radio" value="modeVert" v-model="mode"><label for="rb1">верт.</label>
	    <input id="rb2" type="radio" value="modeHori" v-model="mode"><label for="rb2">гориз.</label>
	    <input id="rb3" type="radio" value="modeNone" v-model="mode"><label for="rb3">1:1</label>
	    <!-- [<span>Выбрано: {{ mode }}</span>] -->
	  </div>
	</header>
	<aside id="aside">
		<template v-for="f in files">
			<div class="thumbnail">
				<img @click="viewFile" :src="f.src" :alt="f.name" />
			</div>
			<!-- [<p>{{ f.name }}</p>] -->
		</template>
    </aside>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";

  export default Vue.extend({
    data: function() {
      return {
        files: [],
		mode: "modeNone",
      }
    },
    watch: {
      mode: function (newMode) {
		this.drawImage();
      }
    },	
    methods: {
      previewFiles(event) {
        // console.log(event.target.files);
        this.files = Array.from(event.target.files, it => ({ name: it.name, src: URL.createObjectURL(it) }));
        this.files = this.files.filter(it => (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(it.name));
        console.log(this.files);
      },
      viewFile(event) {
        // console.log(event.target.src);
		this.src = event.target.src;
		this.drawImage();
      },
      drawImage() {
        const img = new Image();
        img.onload = () => {
		  img.onload = null;
          this.ctx.fillRect(0, 0, canvas.width, canvas.height);
          let k = 1;
		  switch (this.mode) {
		    case "modeBoth":
		      k = (img.width > img.height)? (canvas.width / img.width): (canvas.height / img.height);
		      break;
		    case "modeVert":
		      k = canvas.height / img.height;
		      break;
		    case "modeHori":
		      k = canvas.width / img.width;
		      break;
		    case "modeNone":
		    default:
		      k = 1;
		  }
          let ww = img.width * k, hh = img.height * k, dx = 0, dy = 0;
          dx = (canvas.width > ww)? (canvas.width - ww)/2: 0;
          dy = (canvas.height > hh)? (canvas.height - hh)/2: 0;
          this.ctx.drawImage(img, 0,0,img.width,img.height, dx,dy,ww,hh);
        };
        img.src = this.src;
      },
      drawText() {
	    this.ctx.fillStyle = "#369";
	    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
	    this.ctx.textAlign = "center";
	    this.ctx.textBaseline = "middle";
	    this.ctx.font = "64px Verdana";
	    this.ctx.fillStyle = "#fff";
	    this.ctx.fillText("Новый Диск", canvas.width/2, canvas.height/2);
	    this.ctx.fillStyle = "#369";
      },
	  resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
	    this.drawText();
	  },
    },
    mounted: function(){
	  // console.log("mounted()");
	  this.canvas = document.getElementById("canvas");
	  this.ctx = canvas.getContext("2d");
	  window.addEventListener('resize', this.resizeCanvas, false);
	  this.resizeCanvas();
    },
  });
</script>


