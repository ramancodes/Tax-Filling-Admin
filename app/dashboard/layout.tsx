'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {QuestionMarkCircleIcon, NewspaperIcon, HomeIcon, UserIcon, DocumentMagnifyingGlassIcon, BanknotesIcon, DocumentTextIcon } from '@heroicons/react/24/outline';


export default function DashboardLayout({ children } : any) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNavigation />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        {children}
      </div>
    </div>
  );
}

function SideNavigation() {
  const pathname = usePathname();
  
  const navigationItems = [
    {
      name: 'Overview',
      href: '/dashboard/overview',
      icon: HomeIcon,
    },
    {
      name: 'Users',
      href: '/dashboard/users',
      icon: UserIcon,
    },
    {
      name: 'Tax Returns',
      href: '/dashboard/itr-history',
      icon: BanknotesIcon,
    },
    {
      name: 'Documents',
      href: '/dashboard/documents',
      icon: DocumentTextIcon,
    },
    {
      name: 'Search Details',
      href: '/dashboard/search',
      icon: DocumentMagnifyingGlassIcon,
    },
    {
      name: 'Update News',
      href: '/dashboard/update-news',
      icon: NewspaperIcon,
    },
    {
      name: 'Update FAQs',
      href: '/dashboard/update-faqs',
      icon: QuestionMarkCircleIcon,
    },
  ];
  
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>
      <nav className="mt-2">
        <ul>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className={`flex items-center px-6 py-4 text-sm ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}