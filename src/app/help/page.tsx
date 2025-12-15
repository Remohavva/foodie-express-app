'use client'

import { useState } from 'react'
import { Search, Phone, Mail, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

const faqData = [
  {
    category: 'Orders & Delivery',
    questions: [
      {
        question: 'How can I track my order?',
        answer: 'You can track your order in real-time by going to "My Orders" section in your profile. You\'ll receive SMS updates and can see live tracking on the order details page.'
      },
      {
        question: 'What if my order is delayed?',
        answer: 'If your order is delayed beyond the estimated time, you can contact the restaurant directly or reach out to our customer support. We may offer compensation for significant delays.'
      },
      {
        question: 'Can I cancel my order?',
        answer: 'You can cancel your order within 2 minutes of placing it. After that, cancellation depends on the restaurant\'s policy and order preparation status.'
      },
      {
        question: 'What are the delivery charges?',
        answer: 'Delivery charges vary by distance and restaurant. Orders above ₹299 get free delivery. You can see exact charges before placing your order.'
      }
    ]
  },
  {
    category: 'Payments & Refunds',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery. All online payments are secured with industry-standard encryption.'
      },
      {
        question: 'How do refunds work?',
        answer: 'Refunds are processed within 5-7 business days to your original payment method. For cash payments, refunds are credited to your FoodieExpress wallet.'
      },
      {
        question: 'My payment failed but money was deducted',
        answer: 'If payment fails but money is deducted, it will be automatically refunded within 24-48 hours. Contact support if it takes longer.'
      }
    ]
  },
  {
    category: 'Account & Profile',
    questions: [
      {
        question: 'How do I change my delivery address?',
        answer: 'Go to Profile > Addresses to add, edit, or delete delivery addresses. You can also change the address during checkout.'
      },
      {
        question: 'I forgot my password',
        answer: 'Click on "Forgot Password" on the login page and enter your email. You\'ll receive a reset link to create a new password.'
      },
      {
        question: 'How do I delete my account?',
        answer: 'Contact our customer support to delete your account. Note that this action is irreversible and all data will be permanently removed.'
      }
    ]
  }
]

const contactOptions = [
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our customer support team',
    action: 'Call Now',
    details: '+91 1800-123-4567',
    available: '24/7 Available'
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support agents',
    action: 'Start Chat',
    details: 'Average response: 2 minutes',
    available: '6 AM - 12 AM'
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us your queries via email',
    action: 'Send Email',
    details: 'support@foodieexpress.com',
    available: 'Response within 24 hours'
  }
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredFaqs = faqData.filter(category => {
    if (selectedCategory !== 'all' && category.category !== selectedCategory) return false
    
    if (searchQuery) {
      return category.questions.some(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return true
  })

  const toggleFaq = (questionId: string) => {
    setExpandedFaq(expandedFaq === questionId ? null : questionId)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {contactOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card key={option.title} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>
                  <p className="text-gray-900 font-medium text-sm mb-1">
                    {option.details}
                  </p>
                  <p className="text-gray-500 text-xs mb-4">
                    {option.available}
                  </p>
                  <Button size="sm" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {faqData.map((category) => (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.category
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </CardHeader>
          
          <CardContent>
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  No FAQs found matching your search.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFaqs.map((category) => (
                  <div key={category.category}>
                    <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.questions
                        .filter(q => 
                          !searchQuery || 
                          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((faq, index) => {
                          const faqId = `${category.category}-${index}`
                          return (
                            <div
                              key={faqId}
                              className="border border-gray-200 rounded-lg overflow-hidden"
                            >
                              <button
                                onClick={() => toggleFaq(faqId)}
                                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                              >
                                <span className="font-medium text-gray-900">
                                  {faq.question}
                                </span>
                                {expandedFaq === faqId ? (
                                  <ChevronUp className="w-5 h-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="w-5 h-5 text-gray-500" />
                                )}
                              </button>
                              {expandedFaq === faqId && (
                                <div className="px-4 pb-3 text-gray-700 border-t border-gray-100">
                                  {faq.answer}
                                </div>
                              )}
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <Card className="mt-8">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still need help?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <MessageCircle className="w-4 h-4 mr-2" />
                Start Live Chat
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}