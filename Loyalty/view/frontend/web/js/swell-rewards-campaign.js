class CampaignGrid {
  constructor(campaignsArray) {
    this.campaignsArray = campaignsArray;
  }
  renderCampaigns() {
    this.campaignsArray.forEach((element, ind) => {
      jQuery(".campaign-grid").append(
        jQuery("<div>").attr({
          'class': "grid-item swell-campaign-link",
          'id': element.id,
          'data-campaign-id': element.id,
          'data-display-mode': "modal",
          'href': "javascript:void(0)"
        }).append(
          (!element.backgroundImageUrl ? jQuery(`<i class='fa ${element.icon}' aria-hidden='true'></i>`) : jQuery(`<img class='campaign-icon' src='${element.backgroundImageUrl}'></img>`)),
          jQuery("<p>").text(element.title),
          jQuery("<p>").text(element.rewardText).addClass("rewards-points")
        ))
    });

    // Refer a friend link prevents popup and redirects to referrals page
    jQuery("#492223").attr({
      'data-display-mode': 'none'
    }).click(function (e) {
      e.preventDefault();
      location.href = '/magento2/loyalty/refer'
    });
  }
}