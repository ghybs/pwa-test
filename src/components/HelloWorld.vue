<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Demo</h3>

    <p>Some form:</p>
    <ul>
      <li>
        Item free text:
        <input type="text" v-model="item.text" placeholder="Free text..." />
      </li>
      <li>Item checkbox: <input type="checkbox" v-model="item.checked" /></li>
      <li>
        Item dropdown:
        <select v-model="item.select">
          <option>Item A</option>
          <option>Value B</option>
          <option>42</option>
        </select>
      </li>
    </ul>

    <button @click="toPdf">As PDF</button>

    <br /><br />

    <button @click="toEmail">To email</button> (but still need to manually
    attach the PDF file to the email)
    <br />
    (this is a limitation of websites and PWA's, but not for Mobile Apps)

    <hr />

    <label :for="myId">Add a photo</label>
    <input
      :id="myId"
      ref="input"
      type="file"
      accept="image/*"
      :capture="autoCamera ? 'camera' : null"
      @change="readURL"
    />
    <br />
    <input :id="anotherId" type="checkbox" v-model="autoCamera" />
    <label :for="anotherId"
      >Automatically use camera to take a picture (otherwise open file
      picker)</label
    >

    <div ref="forEmail">
      <img class="img" :src="imgData" alt="your image" />
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      imgData: "",
      item: {
        text: undefined,
        checked: false,
        select: undefined,
      },
      myId: "someRandomUniqueIdentifier",
      anotherId: "someOtherUniqueIdentifier",
      autoCamera: true,
    };
  },
  methods: {
    readURL() {
      const input = this.$refs.input;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e) => {
          this.imgData = e.target.result;
        };

        reader.readAsDataURL(input.files[0]);
      }
    },
    toPdf() {
      html2pdf()
        .from(document.body)
        .set({
          filename: "hiy.pdf",
        })
        .save();
    },
    toEmail() {
      //console.log(this.item);
      let mailBody = `free text: ${this.item.text}%0D%0A<br>Checked? ${
        this.item.checked ? "yes" : "no"
      }%0D%0A<br>Dropdown selected value: ${this.item.select}`;
      //mailBody = encodeURIComponent(mailBody);
      window.location =
        "mailto:yourmail@domain.com?subject=hii&body=" + mailBody;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
li {
  text-align: initial;
}
a {
  color: #42b983;
}
.img {
  max-width: 100%;
}
</style>
