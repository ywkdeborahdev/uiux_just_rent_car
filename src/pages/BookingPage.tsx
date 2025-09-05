import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDays, differenceInCalendarDays } from 'date-fns';
import CarDetailBanner from '../components/CarDetailBanner/CarDetailBanner';
import BookingStep1 from '../components/BookingStep1/BookingStep1';
import BookingStep2 from '../components/BookingStep2/BookingStep2';
import BookingStep3 from '../components/BookingStep3/BookingStep3';
import { cars } from '../data/carData';
import { useAuth } from '../context/AuthContext';
import './BookingPage.css';

type BookingPageProps = {
    t: (key: string) => string;
};

type FormErrors = {
    [key: string]: string;
};

const BookingPage: React.FC<BookingPageProps> = ({ t }) => {
    const { carId } = useParams<{ carId: string }>();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const car = cars.find(c => c.id === parseInt(carId || ''));

    const [currentStep, setCurrentStep] = useState(1);

    // State for Step 1
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        emailCode: '',
        phonePrefix: '+852',
        phone: '',
        phoneCode: '',
    });

    // State for Step 2
    const [bookingDetails, setBookingDetails] = useState({
        pickupLocation: car?.location[0] || '',
        pLicense: false,
        other: '',
        dateRange: [{
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'
        }]
    });

    // State for Step 3
    const [paymentData, setPaymentData] = useState({
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvc: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (currentUser) {
            setContactData(prev => ({
                ...prev,
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
                phonePrefix: currentUser.phonePrefix
            }));
            setCurrentStep(2); // Skip to step 2 for logged in users
        }
    }, [currentUser]);


    if (!car) {
        return <div>{t('carDetailPage.carNotFound')}</div>;
    }

    const { startDate, endDate } = bookingDetails.dateRange[0];
    const rentalDays = differenceInCalendarDays(endDate, startDate) + 1 || 1;
    const totalPrice = (car.price.daily * rentalDays) + car.deposit;

    const validateStep3 = (data = paymentData, checkAll = false) => {
        const newErrors: FormErrors = {};

        // Card Number (Luhn algorithm check)
        const cardNumber = data.cardNumber.replace(/\s/g, '');
        if (cardNumber && cardNumber !== '1234123412341234') {
            let sum = 0;
            let shouldDouble = false;
            for (let i = cardNumber.length - 1; i >= 0; i--) {
                let digit = parseInt(cardNumber.charAt(i));
                if (shouldDouble) {
                    if ((digit *= 2) > 9) digit -= 9;
                }
                sum += digit;
                shouldDouble = !shouldDouble;
            }

            if (!(sum % 10 === 0 && cardNumber.length >= 13 && cardNumber.length <= 19)) {
                newErrors.cardNumber = t('bookingPage.errors.invalidCardNumber');
            }
        }

        // Expiry Date
        if (data.expiryDate) {
            const [month, year] = data.expiryDate.split(' / ');
            if (!/^(0[1-9]|1[0-2]) \/ ([0-9]{2})$/.test(data.expiryDate) || !month || !year) {
                newErrors.expiryDate = t('bookingPage.errors.invalidExpiry');
            } else {
                const expiry = new Date(parseInt(`20${year}`), parseInt(month), 0);
                if (expiry < new Date()) {
                    newErrors.expiryDate = t('bookingPage.errors.expiredCard');
                }
            }
        }

        if (checkAll) {
            const requiredFields: (keyof typeof paymentData)[] = ['cardholderName', 'cardNumber', 'expiryDate', 'cvc'];
            requiredFields.forEach(field => {
                if (!data[field]) newErrors[field] = t('registerPage.errors.required');
            });
        }

        return newErrors;
    }

    const validateStep2 = () => {
        const newErrors: FormErrors = {};
        const { startDate, endDate } = bookingDetails.dateRange[0];

        if (!startDate || !endDate) {
            newErrors.dateRange = t('bookingPage.errors.invalidDate');
        }

        return newErrors;
    }

    const validate = (data: typeof contactData, checkAllRequired: boolean = false) => {
        const newErrors: FormErrors = {};

        if (data.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                newErrors.email = t('registerPage.errors.invalidEmail');
            }
        }
        if (data.phone) {
            const phoneRegex = /^[0-9]{8}$/;
            if (!phoneRegex.test(data.phone)) {
                newErrors.phone = t('registerPage.errors.invalidPhone');
            }
        }

        if (checkAllRequired) {
            const requiredFields: (keyof typeof contactData)[] = ['name', 'email', 'phone', 'emailCode', 'phoneCode'];
            requiredFields.forEach(field => {
                if (!data[field]) {
                    newErrors[field] = t('registerPage.errors.required');
                }
            });
        }

        if (data.emailCode && data.emailCode !== '000') {
            newErrors.emailCode = t('registerPage.errors.invalidCode');
        }

        if (data.phoneCode && data.phoneCode !== '000') {
            newErrors.phoneCode = t('registerPage.errors.invalidCode');
        }

        return newErrors;
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { id, value } = e.target;

        if (id === 'cardNumber') value = value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        if (id === 'expiryDate') {
            value = value.replace(/\D/g, '');
            if (value.length > 2) value = `${value.slice(0, 2)} / ${value.slice(2, 4)}`;
        }
        if (id === 'cvc') value = value.replace(/\D/g, '');

        const newPaymentData = { ...paymentData, [id]: value };
        setPaymentData(newPaymentData);
    };

    const handlePaymentFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        if (errors[id]) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
        }
    };

    const handlePaymentBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id } = e.target;
        const onBlurErrors = validateStep3(paymentData, false);
        setErrors(prev => ({ ...prev, [id]: onBlurErrors[id] }));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id === 'pLicense') {
            const { checked } = e.target as HTMLInputElement;
            setBookingDetails(prev => ({ ...prev, pLicense: checked }));
        } else if (id === "other") {
            setBookingDetails(prev => ({ ...prev, other: value }));
        } else {
            const newFormData = { ...contactData, [id]: value };
            setContactData(newFormData);
            if (errors[id]) {
                const newErrors = { ...errors };
                delete newErrors[id];
                setErrors(newErrors);
            }
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const onBlurErrors = validate(contactData);
        setErrors(prev => ({ ...prev, ...onBlurErrors }));
    };

    const handleNextStep = () => {
        let finalErrors: FormErrors = {};
        if (currentStep === 1) finalErrors = validate(contactData, true);
        else if (currentStep === 2) finalErrors = validateStep2();
        else if (currentStep === 3) finalErrors = validateStep3(paymentData, true);

        setErrors(finalErrors);

        if (Object.keys(finalErrors).length === 0) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                const finalData = { ...contactData, ...bookingDetails };
                console.log('Booking submitted:', finalData);
                navigate('/message', { state: { message: 'bookingPage.success' } });
            }
        } else {
            console.log("Form has errors:", finalErrors);
        }
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setErrors({}); // Clear errors when going back
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div>
            <CarDetailBanner carImage={car.image} carName={car.name} />
            <div className="booking-container">
                <div className="booking-form-content">
                    {currentStep === 1 && (
                        <BookingStep1
                            formData={contactData}
                            t={t}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors}
                        />
                    )}
                    {currentStep === 2 && (
                        <BookingStep2
                            car={car}
                            t={t}
                            bookingDetails={bookingDetails}
                            onLocationChange={(loc) => setBookingDetails({ ...bookingDetails, pickupLocation: loc })}
                            onDateChange={(ranges) => {
                                const { startDate, endDate, key } = ranges.selection;
                                setBookingDetails({
                                    ...bookingDetails,
                                    dateRange: [{
                                        startDate: startDate ?? new Date(),
                                        endDate: endDate ?? addDays(new Date(), 7),
                                        key: key ?? 'selection'
                                    }]
                                });
                            }}
                            onDetailsChange={handleChange}
                            errors={errors}
                        />
                    )}
                    {currentStep === 3 && (
                        <BookingStep3
                            car={car}
                            t={t}
                            contactData={contactData}
                            bookingDetails={bookingDetails}
                            paymentData={paymentData}
                            totalPrice={totalPrice}
                            errors={errors}
                            handlePaymentChange={handlePaymentChange}
                            handlePaymentBlur={handlePaymentBlur}
                            handlePaymentFocus={handlePaymentFocus}
                        />
                    )}

                    <div className="booking-navigation">
                        {(currentStep == 2 && !currentUser) || currentStep == 3 && (
                            <button onClick={handlePreviousStep} className="prev-step-button">
                                {t('bookingPage.prevStep')}
                            </button>
                        )}
                        <button onClick={handleNextStep} className="next-step-button">
                            {currentStep === 3 ? t('bookingPage.submit') : t('bookingPage.nextStep')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;