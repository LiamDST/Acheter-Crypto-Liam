/**
 * Utilitaires pour le partage social optimisé
 */

export interface SocialShareData {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  hashtags?: string[];
}

/**
 * Génère les URLs de partage pour différentes plateformes sociales
 */
export class SocialShareUtils {
  
  /**
   * Partage sur Facebook
   */
  static shareOnFacebook(data: SocialShareData): string {
    const params = new URLSearchParams({
      u: data.url,
      quote: `${data.title} - ${data.description}`,
    });
    
    return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
  }
  
  /**
   * Partage sur X (ex-Twitter)
   */
  static shareOnTwitter(data: SocialShareData): string {
    const text = `${data.title}\n\n${data.description}`;
    const hashtags = data.hashtags?.join(',') || 'crypto,blockchain,trading,AlyahKnowledge';
    
    const params = new URLSearchParams({
      text,
      url: data.url,
      hashtags,
      via: 'JCrypto83280',
    });
    
    return `https://twitter.com/intent/tweet?${params.toString()}`;
  }
  
  /**
   * Partage sur LinkedIn
   */
  static shareOnLinkedIn(data: SocialShareData): string {
    const params = new URLSearchParams({
      url: data.url,
      title: data.title,
      summary: data.description,
      source: 'Alyah Knowledge',
    });
    
    return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`;
  }
  
  /**
   * Partage sur WhatsApp
   */
  static shareOnWhatsApp(data: SocialShareData): string {
    const text = `*${data.title}*\n\n${data.description}\n\n${data.url}`;
    
    const params = new URLSearchParams({
      text,
    });
    
    return `https://wa.me/?${params.toString()}`;
  }
  
  /**
   * Partage sur Telegram
   */
  static shareOnTelegram(data: SocialShareData): string {
    const text = `*${data.title}*\n\n${data.description}\n\n📈 Découvrez plus d'analyses crypto sur Alyah Knowledge`;
    
    const params = new URLSearchParams({
      url: data.url,
      text,
    });
    
    return `https://t.me/share/url?${params.toString()}`;
  }
  
  /**
   * Copie le lien dans le presse-papier
   */
  static async copyToClipboard(url: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
      return false;
    }
  }
  
  /**
   * Partage natif du navigateur (Web Share API)
   */
  static async shareNative(data: SocialShareData): Promise<boolean> {
    try {
      if (navigator.share) {
        await navigator.share({
          title: data.title,
          text: data.description,
          url: data.url,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erreur lors du partage natif:', error);
      return false;
    }
  }
  
  /**
   * Partage intelligent : essaie le partage natif, puis copie le lien
   */
  static async smartShare(data: SocialShareData): Promise<boolean> {
    try {
      // Essayer d'abord le partage natif
      const nativeSuccess = await this.shareNative(data);
      if (nativeSuccess) return true;
      
      // Fallback : copier le lien
      return await this.copyToClipboard(data.url);
    } catch (error) {
      console.error('Erreur lors du partage intelligent:', error);
      return await this.copyToClipboard(data.url);
    }
  }
  
  /**
   * Valide les dimensions d'image pour le partage social
   */
  static validateImageDimensions(imageUrl: string): Promise<{ width: number; height: number; isValid: boolean }> {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        const isValid = img.width >= 1200 && img.height >= 630;
        resolve({
          width: img.width,
          height: img.height,
          isValid
        });
      };
      
      img.onerror = () => {
        resolve({
          width: 0,
          height: 0,
          isValid: false
        });
      };
      
      img.src = imageUrl;
    });
  }
  
  /**
   * Génère les métadonnées Open Graph optimisées
   */
  static generateOpenGraphMeta(data: SocialShareData): Record<string, string> {
    return {
      'og:title': data.title,
      'og:description': data.description,
      'og:image': data.imageUrl,
      'og:url': data.url,
      'og:type': 'article',
      'og:site_name': 'Alyah Knowledge',
      'og:locale': 'fr_FR',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': `Image de couverture pour: ${data.title}`,
      'og:image:type': 'image/jpeg',
      'og:image:secure_url': data.imageUrl,
    };
  }
  
  /**
   * Génère les métadonnées Twitter Card optimisées
   */
  static generateTwitterCardMeta(data: SocialShareData): Record<string, string> {
    return {
      'twitter:card': 'summary_large_image',
      'twitter:title': data.title,
      'twitter:description': data.description,
      'twitter:image': data.imageUrl,
      'twitter:image:alt': `Image de couverture pour: ${data.title}`,
      'twitter:site': '@AlyahKnowledge',
      'twitter:creator': '@AlyahKnowledge',
    };
  }
}

/**
 * Hook personnalisé pour le partage social
 */
export function useSocialShare() {
  const share = async (data: SocialShareData, platform?: 'facebook' | 'twitter' | 'linkedin' | 'whatsapp' | 'telegram' | 'native') => {
    try {
      if (!platform || platform === 'native') {
        // Essayer d'abord le partage natif
        const nativeSuccess = await SocialShareUtils.shareNative(data);
        if (nativeSuccess) return true;
      }
      
      // Partage sur plateforme spécifique
      let shareUrl: string;
      
      switch (platform) {
        case 'facebook':
          shareUrl = SocialShareUtils.shareOnFacebook(data);
          break;
        case 'twitter':
          shareUrl = SocialShareUtils.shareOnTwitter(data);
          break;
        case 'linkedin':
          shareUrl = SocialShareUtils.shareOnLinkedIn(data);
          break;
        case 'whatsapp':
          shareUrl = SocialShareUtils.shareOnWhatsApp(data);
          break;
        case 'telegram':
          shareUrl = SocialShareUtils.shareOnTelegram(data);
          break;
        default:
          // Fallback: copier le lien
          return await SocialShareUtils.copyToClipboard(data.url);
      }
      
      // Ouvrir la fenêtre de partage
      window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
      return true;
      
    } catch (error) {
      console.error('Erreur lors du partage:', error);
      // Fallback: copier le lien
      return await SocialShareUtils.copyToClipboard(data.url);
    }
  };
  
  return { share };
}

/**
 * Teste la validité des métadonnées de partage social
 */
export async function validateSocialSharingSetup(url: string): Promise<{
  openGraph: boolean;
  twitterCard: boolean;
  imageValid: boolean;
  recommendations: string[];
}> {
  const recommendations: string[] = [];
  
  try {
    // Récupérer la page pour analyser les métadonnées
    const response = await fetch(url);
    const html = await response.text();
    
    // Vérifier les balises Open Graph
    const hasOgTitle = html.includes('property="og:title"');
    const hasOgDescription = html.includes('property="og:description"');
    const hasOgImage = html.includes('property="og:image"');
    const hasOgUrl = html.includes('property="og:url"');
    
    const openGraphValid = hasOgTitle && hasOgDescription && hasOgImage && hasOgUrl;
    
    // Vérifier les balises Twitter Card
    const hasTwitterCard = html.includes('name="twitter:card"');
    const hasTwitterTitle = html.includes('name="twitter:title"');
    const hasTwitterDescription = html.includes('name="twitter:description"');
    const hasTwitterImage = html.includes('name="twitter:image"');
    
    const twitterCardValid = hasTwitterCard && hasTwitterTitle && hasTwitterDescription && hasTwitterImage;
    
    // Extraire l'URL de l'image pour validation
    const imageUrlMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
    let imageValid = false;
    
    if (imageUrlMatch) {
      const imageUrl = imageUrlMatch[1];
      const imageDimensions = await SocialShareUtils.validateImageDimensions(imageUrl);
      imageValid = imageDimensions.isValid;
      
      if (!imageValid) {
        recommendations.push(`Image trop petite: ${imageDimensions.width}x${imageDimensions.height}. Minimum requis: 1200x630px`);
      }
    }
    
    // Générer des recommandations
    if (!openGraphValid) {
      recommendations.push('Balises Open Graph incomplètes');
    }
    
    if (!twitterCardValid) {
      recommendations.push('Balises Twitter Card incomplètes');
    }
    
    return {
      openGraph: openGraphValid,
      twitterCard: twitterCardValid,
      imageValid,
      recommendations
    };
    
  } catch (error) {
    console.error('Erreur lors de la validation:', error);
    return {
      openGraph: false,
      twitterCard: false,
      imageValid: false,
      recommendations: ['Erreur lors de la validation des métadonnées']
    };
  }
}