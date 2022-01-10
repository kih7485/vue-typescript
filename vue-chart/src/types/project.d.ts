import Vue from "vue";
import Chart = require("chart.js");

type ChartLib = typeof Chart;

declare module "vue/types/vue" {
  interface Vue {
    $_Chart: ChartLib;
  }
}
