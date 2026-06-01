import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RotateCw } from 'lucide-react';
import type { CryptoData } from '../types/crypto';
import SparklineChart from '../components/SparklineChart';
import SEOHead from '../components/SEOHead';
import { useTranslation } from 'react-i18next';

function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  }
  if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  }
  return `$${marketCap.toLocaleString()}`;
}

export default function Market() {
  const { t, i18n } = useTranslation();
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchCryptos = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
      );
      if (!response.ok) throw new Error(t('market.error'));
      const data = await response.json();
      setCryptos(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching cryptos:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();
    const interval = setInterval(fetchCryptos, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchCryptos}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              {t('market.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={t('market.title')}
        description="Suivez les cours des cryptomonnaies en temps réel, analysez les tendances et prenez des décisions éclairées avec notre outil de suivi de marché."
        canonicalUrl="https://alyah-knowledge.com/marche-cryptomonnaies-temps-reel"
      />
      
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">{t('market.title')}</h1>
              <p className="mt-2 text-sm text-gray-500">
                {t('market.lastUpdate')} {lastUpdate.toLocaleString(i18n.language)}
              </p>
            </div>
            <button
              onClick={fetchCryptos}
              disabled={isRefreshing}
              className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium
                text-gray-700 bg-white border border-gray-300 shadow-sm
                hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                transition-all duration-200 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <RotateCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {t('market.refresh')}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Mobile View */}
            <div className="sm:hidden divide-y divide-gray-100">
              {cryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <img
                        src={crypto.image}
                        alt={crypto.name}
                        className="w-8 h-8 rounded-full"
                        loading="lazy"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{crypto.name}</div>
                        <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-gray-900">
                        ${crypto.current_price.toLocaleString()}
                      </div>
                      <div
                        className={`flex items-center justify-end text-sm ${
                          crypto.price_change_percentage_24h >= 0
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="w-24">
                      {crypto.sparkline_in_7d?.price && (
                        <SparklineChart
                          data={crypto.sparkline_in_7d.price}
                          isPositive={crypto.price_change_percentage_7d_in_currency >= 0}
                          width={96}
                          height={32}
                        />
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {t('market.marketCap')} {formatMarketCap(crypto.market_cap)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">{t('market.crypto')}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{t('market.price')}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{t('market.change24h')}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{t('market.change7d')}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">{t('market.chart7d')}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{t('market.marketCap')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cryptos.map((crypto) => (
                    <tr
                      key={crypto.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className="w-8 h-8 rounded-full"
                            loading="lazy"
                          />
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{crypto.name}</div>
                            <div className="text-gray-500">{crypto.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="text-gray-900 font-medium">
                          ${crypto.current_price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div
                          className={`inline-flex items-center ${
                            crypto.price_change_percentage_24h >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div
                          className={`inline-flex items-center ${
                            crypto.price_change_percentage_7d_in_currency >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {crypto.price_change_percentage_7d_in_currency >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {Math.abs(crypto.price_change_percentage_7d_in_currency).toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          {crypto.sparkline_in_7d?.price && (
                            <SparklineChart
                              data={crypto.sparkline_in_7d.price}
                              isPositive={crypto.price_change_percentage_7d_in_currency >= 0}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-gray-900">
                        {formatMarketCap(crypto.market_cap)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}