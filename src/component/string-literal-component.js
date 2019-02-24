export default {
  data: () => ({
    source: "String Literal Component",
  }),

  props: ["name"],

  template: `<section>
		<h2>{{ name }}</h2>
		<strong>{{ this.source }}</strong>
	</section>`,
}
