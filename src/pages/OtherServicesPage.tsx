import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegularBanner from '../components/RegularBanner/RegularBanner';
import './OtherServicesPage.css'; // Import the new CSS

// Define props for the page and the reusable item
type OtherServicesPageProps = {
    t: (key: string) => string;
};

type AccordionItemProps = {
    title: string;
    content: string;
};

// Reusable AccordionItem sub-component
const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="accordion-item">
            <div className="accordion-header" onClick={() => setIsExpanded(!isExpanded)}>
                <h3>{title}</h3>
                <button className={`toggle-button ${isExpanded ? 'expanded' : ''}`}>
                    +
                </button>
            </div>
            <div className={`accordion-content ${isExpanded ? 'expanded' : ''}`}>
                <p>{content}</p>
            </div>
        </div>
    );
};


const OtherServicesPage: React.FC<OtherServicesPageProps> = ({ t }) => {
    return (
        <div>
            <RegularBanner />
            <div className="other-services-container">
                <h1 className="page-title">{t('otherServicesPage.title')}</h1>

                <AccordionItem
                    title={t('otherServicesPage.carParts.title')}
                    content={t('otherServicesPage.carParts.content')}
                />
                <AccordionItem
                    title={t('otherServicesPage.documentHandling.title')}
                    content={t('otherServicesPage.documentHandling.content')}
                />
                <AccordionItem
                    title={t('otherServicesPage.carRepair.title')}
                    content={t('otherServicesPage.carRepair.content')}
                />
            </div>
            <div className="enquiry-action">
                <Link to="/contact-us" className="enquiry-btn">{t('otherServicesPage.enquiry')}</Link>
            </div>
        </div>
    );
};

export default OtherServicesPage;