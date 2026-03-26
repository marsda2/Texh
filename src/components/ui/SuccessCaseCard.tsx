import { motion } from 'framer-motion';
import { IphoneMockup } from './IphoneMockup';
import { useLanguage } from '../../lib/i18n';
import './IphoneMockup.css';

interface SuccessCaseCardProps {
  title: string;
  category: string;
  description: string;
  link: string;
  videoUrl?: string;
  imageUrl?: string;
}

export function SuccessCaseCard({
  title,
  category,
  description,
  link,
  videoUrl,
  imageUrl,
}: SuccessCaseCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      className="success-case-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="success-case-media">
        <IphoneMockup
          videoUrl={videoUrl}
          imageUrl={imageUrl}
          scale={0.8}
          link={link}
        />
      </div>

      <div className="success-case-content">
        <h3 className="success-case-title">{title}</h3>

        <div className="success-case-details">
          <span className="success-case-category">{category}</span>
          <p className="success-case-description">{description}</p>

          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="success-case-link"
          >
            {t('portfolio.visit')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
