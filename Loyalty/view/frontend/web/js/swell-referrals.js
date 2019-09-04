class Referrals {
    constructor(referralFormData, shareLinks) {
        this.referralFormData = referralFormData;
        this.shareLinks = shareLinks;
    }

    renderReferralForm(form, onSubmit) {
        jQuery(`.referral-container.${form.formType}`).append(
            jQuery("<form>").addClass(form.formType).append(
                jQuery("<label>").append(
                    jQuery("<p>").text(form.labelText),
                    jQuery("<input>", {
                        type: form.inputType,
                        placeholder: form.placeholder
                    }),
                    jQuery("<button>", {
                        type: "submit",
                    }).html(form.submitText)
                )
            ).submit((e) => onSubmit(e))
        ).addClass("hidden");
        form.formType === "existing" ? this.renderSocialShareLinks(form.formType) : "";
    }

    showReferralForm() {
        this.renderReferralForm(this.referralFormData.newUserForm, this.onClientEmailSubmit);
        this.renderReferralForm(this.referralFormData.existingUserForm, this.onFriendsEmailSubmit);
    }

    revealActiveForm(customer, newUserFormType, existingUserFormType) {
        if (customer.email === undefined) {
            jQuery(`.referral-container.${newUserFormType}`).removeClass("hidden")
        } else {
            jQuery(`.referral-container.${existingUserFormType}`).removeClass("hidden");
            jQuery(`.referrals-list, form.existing, .referral-container.existing, .referral-container .existing, .referred-customers-table, .referred-customers-section`).removeClass("hidden");
        }
    }

    onClientEmailSubmit(e) {
        e.preventDefault();
        let customersInput = jQuery("form.new input");

        let onSuccess = function () {
            jQuery(".swell-form-error, .referral-container.new").remove();
            jQuery("form.new").removeClass("showing-form").addClass("hidden");
            jQuery("form.existing, .referrals-list, .referred-customers-table, .referral-container.existing, .referred-customers-section").removeClass("hidden").addClass("showing-form");
        }

        let onError = function () {
            jQuery(".swell-form-error").remove();
            jQuery("form.new").append(
                jQuery("<p>").text("Oops...something went wrong!").addClass("swell-form-error")
            )
        }

        swellAPI.identifyReferrer(customersInput.val(), onSuccess, onError);
    }

    onFriendsEmailSubmit(e) {
        e.preventDefault();
        let referredEmails = jQuery("form.existing input").val().split(/[\s,]+/);
        let onSuccess = function () {
            jQuery(".referral-failure").remove();
            jQuery(".thank-you-popup").remove();
            jQuery("form.existing").append(
                jQuery("<div>").addClass("thank-you-popup").append(
                    jQuery("<p>").text("Thanks. Tell your friend to check their email!")));

            swellAPI.refreshCustomerDetails();
            setTimeout(function () {
                const newEmailObj = swellAPI.getCustomerDetails().referrals[swellAPI.getCustomerDetails().referrals.length - 1];
                jQuery(".referred-customers-table table").append(
                    jQuery("<tr>").append(
                        jQuery("<td>").text(newEmailObj.email),
                        jQuery("<td>").text(newEmailObj.completedAt === null ? "Invited" : "Purchased($20 earned)")
                    )
                )
                document.getElementsByClassName('existing')[1].reset()
                //console.log(newEmailObj)
            }, 1000);
        }

        let onError = function () {
            jQuery(".referral-failure").remove();
            jQuery(".thank-you-popup").remove();
            jQuery("form.existing").append(
                jQuery("<p>").text("Oops, something went wrong, please try again...").addClass("referral-failure"));
        }
        swellAPI.sendReferralEmails(referredEmails, onSuccess, onError);
    }

    renderReferredEmails(referralsArray) {
        if (referralsArray.length > 0) {
            referralsArray.forEach((ele) => {
                jQuery(".referred-customers-table table").append(
                    jQuery("<tr>").append(
                        jQuery("<td>").text(ele.email),
                        jQuery("<td>").text(ele.completedAt === null ? "Invited" : "Purchased($20 earned)")
                    )
                )
            })
        } else {
            /* jQuery(".referred-customers-table").css("visibility", "hidden"); */
        }
    }

    renderSocialShareLinks(formType) {
        jQuery("<div>").addClass("social-share-links").html("<p>Or share via the buttons below if that's more your vibe.</p>").insertAfter(`form.${formType}`);
        //console.log(this.shareLinks);
        this.shareLinks.forEach(link => {
            jQuery(".social-share-links").append(
                jQuery("<a>", {
                    href: link.href
                }).addClass(link.class).html(
                    //logic to check if a custom image has been added, else default to font-awesome icon
                    link.img ? `<img class='icon-image' src=${link.img}> <span> ${link.text}</span>` : `<i class='${link.icon}'> <span> ${link.text} </span> </i>`
                )
            )
        });
        jQuery(".social-share-links").append(
            jQuery("<a>", {
                href: "javascript:void(0)"
            }).addClass("swell-share-referral-link").html(
                `<i class="fa fa-clipboard icon-image" aria-hidden="true" data-toggle="modal" data-target="#Modal"></i> <span style="-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'"> Copy Link </span> `
            ).click(() => {
                navigator.clipboard.writeText(swellAPI.getCustomerDetails().referralLink);
            })
        );
    }

    static renderReferralLink() {
        jQuery("<div>").addClass('referral-link').text(swellAPI.getCustomerDetails().referralLink).insertAfter("button.close");
        jQuery('button.close').click(function () {
            jQuery('#Modal').css('display', 'none')
        });
        jQuery('.swell-share-referral-link').click(function () {
            jQuery('#Modal').css('display', 'block')
        })

        //highlight copy text when clicked
        jQuery('.copy-link').click(function () {
            if (jQuery('.copy-content .referral-link').hasClass('highlight')) {
                jQuery('.copy-content .referral-link').removeClass('highlight')
            } else {
                jQuery('.copy-content .referral-link').addClass('highlight')
            }
        })

    }
}