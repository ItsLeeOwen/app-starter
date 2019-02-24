export default {
  data: () => ({
    source: "JSX Component",
  }),

  methods: {
    onClick() {
      console.log("click", this.source)
    },
  },

  props: ["name"],

  render() {
    return (
      <section className="as-flavor" onClick={this.onClick}>
        <h2 className="as-flavor__name">{this.name}</h2>
        <strong>{this.source}</strong>
      </section>
    )
  },
}
