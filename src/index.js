import Vue from "vue"
import app from "./app"
import jsx from "./component/jsx-component"
import sfc from "./component/single-file-component"
import slc from "./component/string-literal-component"
import "./index.scss"

// string literal component
Vue.component("my-string-literal-component", slc)

// single file component example
Vue.component("my-single-file-component", sfc)

// jsx based vue component
Vue.component("my-jsx-component", jsx)

// initialize vue app
new Vue(app)
