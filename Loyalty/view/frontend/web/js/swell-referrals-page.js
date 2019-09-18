requirejs(['jquery'], function ($) {
    let referral = new Referrals(swellDef.referralForms, swellDef.referralShareLinks)
    $(document).ready(() => {
        $(document).on("swell:initialized", () => {
            console.log("swell initialized");
            referral.showReferralForm();
        });

        $(document).on("swell:setup", () => {
            console.log("swell setup");
            referral.revealActiveForm(swellAPI.getCustomerDetails(),
                swellDef.referralForms.newUserForm.formType,
                swellDef.referralForms.existingUserForm.formType
            );
            referral.renderReferredEmails(swellAPI.getCustomerDetails().referrals);
            Referrals.renderReferralLink();
        });
    });
});