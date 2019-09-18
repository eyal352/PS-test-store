requirejs(['jquery', 'slick', 'Magento_Customer/js/model/customer'], function ($, slick, customer) {
  let vipSection = new VipSection(swellDef.vipTiers);
  $(document).ready(() => {
    $(document).on("swell:initialized", () => {
      console.log("swell initialized");
      
      // new CampaignGrid(swellAPI.getActiveCampaigns()).renderCampaigns();
    });
    $(document).on("swell:setup", () => {
      console.log("swell setup");
      vipSection.renderVipTiers();
      vipSection.renderVipStatus(swellAPI.getCustomerDetails().vipTier, swellAPI.getVipTiers());
      new CampaignGrid(swellAPI.getActiveCampaigns()).renderCampaigns();
      checkCustomerLoggedIn();
      faqLogic();
      console.log('test with logs')
    });
  });

});