import React, { useState } from 'react';
import { Share2, Facebook, Linkedin, MessageCircle, Copy, Check, Send } from 'lucide-react';
import { useSocialShare, type SocialShareData } from '../lib/socialSharing';

// Composant pour l'icône X (ex-Twitter)
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

// Composant pour l'icône Telegram
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

interface SocialShareButtonsProps {
  article: {
    title: string;
    summary: string;
    image_url: string;
    slug: string;
  };
  className?: string;
  showLabels?: boolean;
  isDictionaryTerm?: boolean;
}

export default function SocialShareButtons({ 
  article, 
  className = '',
  showLabels = false,
  isDictionaryTerm = false
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const { share } = useSocialShare();
  
  const shareData: SocialShareData = {
    title: article.title,
    description: article.summary,
    url: isDictionaryTerm 
      ? `https://alyah-knowledge.com/dictionnaire-crypto/${article.slug}`
      : `https://alyah-knowledge.com/articles/${article.slug}`,
    imageUrl: article.image_url,
    hashtags: ['crypto', 'blockchain', 'trading', 'AlyahKnowledge']
  };
  
  const handleCopyLink = async () => {
    // Utiliser le partage intelligent : natif d'abord, puis copie
    const success = await share(shareData, 'native');
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const socialButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50',
      platform: 'facebook' as const,
    },
    {
      name: 'X',
      icon: XIcon,
      color: 'hover:text-gray-900',
      bgColor: 'hover:bg-gray-50',
      platform: 'twitter' as const,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'hover:text-blue-700',
      bgColor: 'hover:bg-blue-50',
      platform: 'linkedin' as const,
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'hover:text-green-600',
      bgColor: 'hover:bg-green-50',
      platform: 'whatsapp' as const,
    },
    {
      name: 'Telegram',
      icon: TelegramIcon,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50',
      platform: 'telegram' as const,
    },
  ];
  
  return (
    <div className={`flex items-center space-x-1 sm:space-x-2 ${className}`}>
      {showLabels && (
        <span className="text-xs sm:text-sm text-gray-600 mr-1 sm:mr-2 hidden sm:inline">Partager :</span>
      )}
      
      {/* Bouton de partage principal avec copie intégrée */}
      <button
        onClick={handleCopyLink}
        className="p-1.5 sm:p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full 
          transition-all duration-200 transform hover:scale-110 flex-shrink-0"
        title={copied ? 'Lien copié !' : 'Partager / Copier le lien'}
        aria-label={copied ? 'Lien copié dans le presse-papier' : 'Partager cet article ou copier le lien'}
      >
        {copied ? (
          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
        ) : (
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </button>
      
      {/* Boutons de partage spécifiques */}
      {socialButtons.slice(0, 3).map((button) => {
        const Icon = button.icon;
        return (
          <button
            key={button.name}
            onClick={() => share(shareData, button.platform)}
            className={`p-1.5 sm:p-2 text-gray-500 ${button.color} ${button.bgColor} rounded-full 
              transition-all duration-200 transform hover:scale-110 flex-shrink-0`}
            title={`Partager sur ${button.name}`}
            aria-label={`Partager cet article sur ${button.name}`}
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        );
      })}
      
      {/* Boutons supplémentaires visibles uniquement sur desktop */}
      <div className="hidden sm:flex items-center space-x-2">
        {socialButtons.slice(3).map((button) => {
          const Icon = button.icon;
          return (
            <button
              key={button.name}
              onClick={() => share(shareData, button.platform)}
              className={`p-2 text-gray-500 ${button.color} ${button.bgColor} rounded-full 
                transition-all duration-200 transform hover:scale-110 flex-shrink-0`}
              title={`Partager sur ${button.name}`}
              aria-label={`Partager cet article sur ${button.name}`}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
}