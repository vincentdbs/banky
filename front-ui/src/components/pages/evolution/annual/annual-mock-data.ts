/**
 * Mock data for the EvolutionAnnual component
 * This file provides sample data to test and demonstrate the EvolutionAnnual component
 * with account balances, gains/losses, and percentages across different months of a year.
 */

import { formatCurrency } from '@utils/number/NumberUtils';

/**
 * Types for accounts data structure
 */
type TotalByAccount = {
  id: string,
  shortName: string,
  name: string,
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
};

type TotalByCategory = {
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
  totalByAccount: TotalByAccount[],
};

type TotalByAccountAndMonth = {
  total: number,
  gainLoss: number,
  gainLossPercentage: number,
  totalByCategory: Record<string, TotalByCategory>, // string is the banking account type (CHECKING, SAVINGS, MARKET)
};

type AnnualTotal = Record<string, TotalByAccountAndMonth>; // string is a local date (YYYY-MM-DD) of the first day of the month for the year

type YearSummary = {
  total: number,
  gainLoss: number,
  interest: number,
};

// Mock year for the data
export const MOCK_YEAR = 2025;

// Create mock data for the annual evolution table
export const mockAnnualTotal: AnnualTotal = {
  // January
  '2025-01-01': {
    total: 3155.00,
    gainLoss: 155.00,
    gainLossPercentage: 5.17,
    totalByCategory: {
      CHECKING: {
        total: 2500.00,
        gainLoss: 100.00,
        gainLossPercentage: 4.17,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 1750.00,
            gainLoss: 100.00,
            gainLossPercentage: 6.06,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 750.00,
            gainLoss: 0.00,
            gainLossPercentage: 0.00,
          },
        ],
      },
      SAVINGS: {
        total: 655.00,
        gainLoss: 5.00,
        gainLossPercentage: 0.77,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 555.00,
            gainLoss: 5.00,
            gainLossPercentage: 0.91,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 100.00,
            gainLoss: 0.00,
            gainLossPercentage: 0.00,
          },
        ],
      },
      MARKET: {
        total: 0.00,
        gainLoss: 50.00,
        gainLossPercentage: 0.00,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 0.00,
            gainLoss: 50.00,
            gainLossPercentage: 0.00,
          },
        ],
      },
    },
  },
  // February
  '2025-02-01': {
    total: 3585.24,
    gainLoss: 278.00,
    gainLossPercentage: 8.42,
    totalByCategory: {
      CHECKING: {
        total: 2550.00,
        gainLoss: 50.00,
        gainLossPercentage: 2.00,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 1800.00,
            gainLoss: 50.00,
            gainLossPercentage: 2.86,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 750.00,
            gainLoss: 0.00,
            gainLossPercentage: 0.00,
          },
        ],
      },
      SAVINGS: {
        total: 985.24,
        gainLoss: 178.00,
        gainLossPercentage: 22.05,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 805.24,
            gainLoss: 98.00,
            gainLossPercentage: 13.86,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 180.00,
            gainLoss: 80.00,
            gainLossPercentage: 80.00,
          },
        ],
      },
      MARKET: {
        total: 50.00,
        gainLoss: 50.00,
        gainLossPercentage: 100.00,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 50.00,
            gainLoss: 50.00,
            gainLossPercentage: 100.00,
          },
        ],
      },
    },
  },
  // March
  '2025-03-01': {
    total: 4085.24,
    gainLoss: 500.00,
    gainLossPercentage: 13.95,
    totalByCategory: {
      CHECKING: {
        total: 2650.00,
        gainLoss: 100.00,
        gainLossPercentage: 3.92,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 1850.00,
            gainLoss: 50.00,
            gainLossPercentage: 2.78,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 800.00,
            gainLoss: 50.00,
            gainLossPercentage: 6.67,
          },
        ],
      },
      SAVINGS: {
        total: 1235.24,
        gainLoss: 250.00,
        gainLossPercentage: 25.38,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 895.24,
            gainLoss: 90.00,
            gainLossPercentage: 11.17,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 340.00,
            gainLoss: 160.00,
            gainLossPercentage: 88.89,
          },
        ],
      },
      MARKET: {
        total: 200.00,
        gainLoss: 150.00,
        gainLossPercentage: 300.00,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 200.00,
            gainLoss: 150.00,
            gainLossPercentage: 300.00,
          },
        ],
      },
    },
  },
  // April
  '2025-04-01': {
    total: 4585.24,
    gainLoss: 500.00, 
    gainLossPercentage: 12.24,
    totalByCategory: {
      CHECKING: {
        total: 2800.00,
        gainLoss: 150.00,
        gainLossPercentage: 5.66,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 1950.00,
            gainLoss: 100.00,
            gainLossPercentage: 5.41,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 850.00,
            gainLoss: 50.00,
            gainLossPercentage: 6.25,
          },
        ],
      },
      SAVINGS: {
        total: 1485.24,
        gainLoss: 250.00,
        gainLossPercentage: 20.24,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1045.24,
            gainLoss: 150.00,
            gainLossPercentage: 16.76,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 440.00,
            gainLoss: 100.00,
            gainLossPercentage: 29.41,
          },
        ],
      },
      MARKET: {
        total: 300.00,
        gainLoss: 100.00,
        gainLossPercentage: 50.00,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 300.00,
            gainLoss: 100.00,
            gainLossPercentage: 50.00,
          },
        ],
      },
    },
  },
  // May
  '2025-05-01': {
    total: 4835.24,
    gainLoss: 250.00,
    gainLossPercentage: 5.45,
    totalByCategory: {
      CHECKING: {
        total: 2900.00,
        gainLoss: 100.00,
        gainLossPercentage: 3.57,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2000.00,
            gainLoss: 50.00,
            gainLossPercentage: 2.56,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 900.00,
            gainLoss: 50.00,
            gainLossPercentage: 5.88,
          },
        ],
      },
      SAVINGS: {
        total: 1535.24,
        gainLoss: 50.00,
        gainLossPercentage: 3.37,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1095.24,
            gainLoss: 50.00,
            gainLossPercentage: 4.78,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 440.00,
            gainLoss: 0.00,
            gainLossPercentage: 0.00,
          },
        ],
      },
      MARKET: {
        total: 400.00,
        gainLoss: 100.00,
        gainLossPercentage: 33.33,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 400.00,
            gainLoss: 100.00,
            gainLossPercentage: 33.33,
          },
        ],
      },
    },
  },
  // Add more months as needed (June to December for a complete year)
  '2025-06-01': {
    total: 5835.24,
    gainLoss: 1000.00,
    gainLossPercentage: 20.68,
    totalByCategory: {
      CHECKING: {
        total: 3000.00,
        gainLoss: 100.00,
        gainLossPercentage: 3.45,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2100.00,
            gainLoss: 100.00,
            gainLossPercentage: 5.00,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 900.00,
            gainLoss: 0.00,
            gainLossPercentage: 0.00,
          },
        ],
      },
      SAVINGS: {
        total: 1735.24,
        gainLoss: 200.00,
        gainLossPercentage: 13.03,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1245.24,
            gainLoss: 150.00,
            gainLossPercentage: 13.70,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 490.00,
            gainLoss: 50.00,
            gainLossPercentage: 11.36,
          },
        ],
      },
      MARKET: {
        total: 1100.00,
        gainLoss: 700.00,
        gainLossPercentage: 175.00,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 700.00,
            gainLoss: 300.00,
            gainLossPercentage: 75.00,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 400.00,
            gainLoss: 400.00,
            gainLossPercentage: 100.00,
          },
        ],
      },
    },
  },
  '2025-07-01': {
    total: 6935.24,
    gainLoss: 1100.00,
    gainLossPercentage: 18.85,
    totalByCategory: {
      CHECKING: {
        total: 3500.00,
        gainLoss: 500.00,
        gainLossPercentage: 16.67,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2500.00,
            gainLoss: 400.00,
            gainLossPercentage: 19.05,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 1000.00,
            gainLoss: 100.00,
            gainLossPercentage: 11.11,
          },
        ],
      },
      SAVINGS: {
        total: 1935.24,
        gainLoss: 200.00,
        gainLossPercentage: 11.53,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1345.24,
            gainLoss: 100.00,
            gainLossPercentage: 8.03,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 590.00,
            gainLoss: 100.00,
            gainLossPercentage: 20.41,
          },
        ],
      },
      MARKET: {
        total: 1500.00,
        gainLoss: 400.00,
        gainLossPercentage: 36.36,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 900.00,
            gainLoss: 200.00,
            gainLossPercentage: 28.57,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 600.00,
            gainLoss: 200.00,
            gainLossPercentage: 50.00,
          },
        ],
      },
    },
  },
  '2025-08-01': {
    total: 6535.24,
    gainLoss: -400.00,
    gainLossPercentage: -5.77,
    totalByCategory: {
      CHECKING: {
        total: 3200.00,
        gainLoss: -300.00,
        gainLossPercentage: -8.57,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2300.00,
            gainLoss: -200.00,
            gainLossPercentage: -8.00,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 900.00,
            gainLoss: -100.00,
            gainLossPercentage: -10.00,
          },
        ],
      },
      SAVINGS: {
        total: 2035.24,
        gainLoss: 100.00,
        gainLossPercentage: 5.17,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1395.24,
            gainLoss: 50.00,
            gainLossPercentage: 3.72,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 640.00,
            gainLoss: 50.00,
            gainLossPercentage: 8.47,
          },
        ],
      },
      MARKET: {
        total: 1300.00,
        gainLoss: -200.00,
        gainLossPercentage: -13.33,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 800.00,
            gainLoss: -100.00,
            gainLossPercentage: -11.11,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 500.00,
            gainLoss: -100.00,
            gainLossPercentage: -16.67,
          },
        ],
      },
    },
  },
  '2025-09-01': {
    total: 7035.24,
    gainLoss: 500.00,
    gainLossPercentage: 7.65,
    totalByCategory: {
      CHECKING: {
        total: 3400.00,
        gainLoss: 200.00,
        gainLossPercentage: 6.25,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2400.00,
            gainLoss: 100.00,
            gainLossPercentage: 4.35,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 1000.00,
            gainLoss: 100.00,
            gainLossPercentage: 11.11,
          },
        ],
      },
      SAVINGS: {
        total: 2135.24,
        gainLoss: 100.00,
        gainLossPercentage: 4.91,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1445.24,
            gainLoss: 50.00,
            gainLossPercentage: 3.58,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 690.00,
            gainLoss: 50.00,
            gainLossPercentage: 7.81,
          },
        ],
      },
      MARKET: {
        total: 1500.00,
        gainLoss: 200.00,
        gainLossPercentage: 15.38,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 900.00,
            gainLoss: 100.00,
            gainLossPercentage: 12.50,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 600.00,
            gainLoss: 100.00,
            gainLossPercentage: 20.00,
          },
        ],
      },
    },
  },
  '2025-10-01': {
    total: 7535.24,
    gainLoss: 500.00,
    gainLossPercentage: 7.11,
    totalByCategory: {
      CHECKING: {
        total: 3600.00,
        gainLoss: 200.00,
        gainLossPercentage: 5.88,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2500.00,
            gainLoss: 100.00,
            gainLossPercentage: 4.17,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 1100.00,
            gainLoss: 100.00,
            gainLossPercentage: 10.00,
          },
        ],
      },
      SAVINGS: {
        total: 2235.24,
        gainLoss: 100.00,
        gainLossPercentage: 4.68,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1495.24,
            gainLoss: 50.00,
            gainLossPercentage: 3.46,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 740.00,
            gainLoss: 50.00,
            gainLossPercentage: 7.25,
          },
        ],
      },
      MARKET: {
        total: 1700.00,
        gainLoss: 200.00,
        gainLossPercentage: 13.33,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 1000.00,
            gainLoss: 100.00,
            gainLossPercentage: 11.11,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 700.00,
            gainLoss: 100.00,
            gainLossPercentage: 16.67,
          },
        ],
      },
    },
  },
  '2025-11-01': {
    total: 8835.24,
    gainLoss: 1300.00,
    gainLossPercentage: 17.25,
    totalByCategory: {
      CHECKING: {
        total: 4000.00,
        gainLoss: 400.00,
        gainLossPercentage: 11.11,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 2800.00,
            gainLoss: 300.00,
            gainLossPercentage: 12.00,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 1200.00,
            gainLoss: 100.00,
            gainLossPercentage: 9.09,
          },
        ],
      },
      SAVINGS: {
        total: 2435.24,
        gainLoss: 200.00,
        gainLossPercentage: 8.95,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1645.24,
            gainLoss: 150.00,
            gainLossPercentage: 10.03,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 790.00,
            gainLoss: 50.00,
            gainLossPercentage: 6.76,
          },
        ],
      },
      MARKET: {
        total: 2400.00,
        gainLoss: 700.00,
        gainLossPercentage: 41.18,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 1300.00,
            gainLoss: 300.00,
            gainLossPercentage: 30.00,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 1100.00,
            gainLoss: 400.00,
            gainLossPercentage: 57.14,
          },
        ],
      },
    },
  },
  '2025-12-01': {
    total: 10035.24,
    gainLoss: 1200.00,
    gainLossPercentage: 13.58,
    totalByCategory: {
      CHECKING: {
        total: 4600.00,
        gainLoss: 600.00,
        gainLossPercentage: 15.00,
        totalByAccount: [
          {
            id: '1',
            shortName: 'CA',
            name: 'Crédit Agricole',
            total: 3200.00,
            gainLoss: 400.00,
            gainLossPercentage: 14.29,
          },
          {
            id: '5',
            shortName: 'FTO',
            name: 'Fortuneo',
            total: 1400.00,
            gainLoss: 200.00,
            gainLossPercentage: 16.67,
          },
        ],
      },
      SAVINGS: {
        total: 2735.24,
        gainLoss: 300.00,
        gainLossPercentage: 12.32,
        totalByAccount: [
          {
            id: '6',
            shortName: 'LA',
            name: 'Livret A',
            total: 1845.24,
            gainLoss: 200.00,
            gainLossPercentage: 12.16,
          },
          {
            id: '7',
            shortName: 'LJ',
            name: 'Livret Jeune',
            total: 890.00,
            gainLoss: 100.00,
            gainLossPercentage: 12.66,
          },
        ],
      },
      MARKET: {
        total: 2700.00,
        gainLoss: 300.00,
        gainLossPercentage: 12.50,
        totalByAccount: [
          {
            id: '11',
            shortName: 'PEA',
            name: 'PEA',
            total: 1500.00,
            gainLoss: 200.00,
            gainLossPercentage: 15.38,
          },
          {
            id: '8',
            shortName: 'LA2',
            name: 'Linxea Avenir 2',
            total: 1200.00,
            gainLoss: 100.00,
            gainLossPercentage: 9.09,
          },
        ],
      },
    },
  },
};

export const mockYearSummary: YearSummary = {
  total: 10035.24,
  gainLoss: 6883.00,
  interest: 152.24
};

// Function to demonstrate how to use the EvolutionAnnual component
export const getMockAnnualEvolutionData = () => {
  return {
    year: MOCK_YEAR,
    annualTotal: mockAnnualTotal,
    yearSummary: mockYearSummary
  };
};

// Example of how to use the mock data
/*
import { EvolutionAnnual } from '@components/pages/evolution/annual/EvolutionAnnual';
import { getMockAnnualEvolutionData } from '@components/pages/evolution/annual/annual-mock-data';

const AnnualEvolutionExample = () => {
  const mockData = getMockAnnualEvolutionData();
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Annual Evolution Example</h1>
      <EvolutionAnnual 
        year={mockData.year}
        annualTotal={mockData.annualTotal}
        yearSummary={mockData.yearSummary}
      />
    </div>
  );
};
*/