'use client'
import React from 'react'
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {

    const {register, handleSubmit,control,formState:{errors,isSubmitting},} = useForm<SignUpFormData>({
        defaultValues: {
            fullName:'',
            email:'',
            password:',',
            country:'US',
            investmentGoals:'Growth',
            riskTolerance:'Medium',
            preferredIndustry:'Technology'
        },
        mode:'onBlur'
    },);

    const onSubmit = async (data:SignUpFormData) => {
        try{
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <h1 className="form-title">Sign up and personalise</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <InputField
                    name="ullName"
                    label="Full Name"
                    placeholder="John Doe"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: 'Full name is required',
                        minLength: { value: 2, message: "Full name must be at least 2 characters" }
                    }}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+@\w+\.\w+$/,
                            message: 'Invalid email format'
                        }
                    }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters'
                        }
                    }}
                />

                <CountrySelectField name="country" label="country" control={control} error={errors.country} />

                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goals"
                    options = {INVESTMENT_GOALS}
                    control={control}
                    error = {errors.investmentGoals}
                    required />

                <SelectField
                    name="iriskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk tolerance"
                    options = {RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error = {errors.riskTolerance}
                    required />

                <SelectField
                    name="preferredIndustry"
                    label="Prefferred Industry"
                    placeholder="Select your prefferred industry"
                    options = {PREFERRED_INDUSTRIES}
                    control={control}
                    error = {errors.preferredIndustry}
                    required />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? "Creating account..." : "Start your investing journey"}
                </Button>

                <FooterLink text="Already have an account?   " linkText="Sign in" href="/sign-in" />
            </form>
        </>
    )
}
export default SignUp
