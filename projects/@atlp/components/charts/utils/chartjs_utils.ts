export function addChartResponsivenessAndLangSettings(
  options: any,
  lang: string
) {
  let isRtl: Boolean = lang == 'en' ? false : true;
  // options = {
  //   ...options,
  //   tooltips: {
  //     rtl: isRtl,
  //   },
  //   legend: {
  //     rtl: isRtl,
  //   },
  //   maintainAspectRatio: false,
  //   responsive: true,
  // };
  options.tooltips.rtl = isRtl;
  options.legend.rtl = isRtl;
  options.maintainAspectRatio = false;
  options.responsive = true;
  return options;
}
