"use client"


import { useState } from "react"
import { Users, Globe, Mail, Linkedin, Twitter, ExternalLink } from "lucide-react"
import PageTransition from './PageTransition';

// Define types for committee members
type MemberRole =
  | "Chair"
  | "Co-Chair"
  | "Technical Program Chair"
  | "Publications Chair"
  | "Publicity Chair"
  | "Local Arrangements Chair"
  | "Member"

interface CommitteeMember {
  id: number
  name: string
  role: MemberRole
  affiliation: string
  country: string
  bio: string
  image: string
  links?: {
    email?: string
    website?: string
    linkedin?: string
    twitter?: string
  }
}

// Sample committee members data
const committeeMembers: CommitteeMember[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Chair",
    affiliation: "Stanford University",
    country: "United States",
    bio: "Dr. Chen specializes in advanced cryptography and secure systems design with over 15 years of experience in the field.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "sarah.chen@example.com",
      website: "https://example.com/schen",
      linkedin: "https://linkedin.com/in/sarahchen",
    },
  },
  {
    id: 2,
    name: "Prof. Raj Patel",
    role: "Co-Chair",
    affiliation: "MIT",
    country: "United States",
    bio: "Professor Patel leads the Cyber Defense Research Group and has published extensively on threat intelligence systems.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "raj.patel@example.com",
      linkedin: "https://linkedin.com/in/rajpatel",
      twitter: "https://twitter.com/rajpatel",
    },
  },
  {
    id: 3,
    name: "Dr. Elena Volkov",
    role: "Technical Program Chair",
    affiliation: "Moscow State University",
    country: "Russia",
    bio: "Dr. Volkov is renowned for her work in AI-driven threat detection and has led several international research collaborations.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "elena.volkov@example.com",
      website: "https://example.com/evolkov",
    },
  },
  {
    id: 4,
    name: "Dr. Jamal Ibrahim",
    role: "Publications Chair",
    affiliation: "University of Cairo",
    country: "Egypt",
    bio: "Dr. Ibrahim specializes in secure communications and has authored over 50 papers on encryption technologies.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "jamal.ibrahim@example.com",
    },
  },
  {
    id: 5,
    name: "Prof. Yuki Tanaka",
    role: "Publicity Chair",
    affiliation: "Tokyo Institute of Technology",
    country: "Japan",
    bio: "Professor Tanaka is a leading researcher in quantum cryptography and secure network protocols.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "yuki.tanaka@example.com",
      twitter: "https://twitter.com/yukitanaka",
    },
  },
  {
    id: 6,
    name: "Dr. Maria Rodriguez",
    role: "Local Arrangements Chair",
    affiliation: "University of Barcelona",
    country: "Spain",
    bio: "Dr. Rodriguez focuses on privacy-preserving technologies and has extensive experience organizing international conferences.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "maria.rodriguez@example.com",
      linkedin: "https://linkedin.com/in/mariarodriguez",
    },
  },
  {
    id: 7,
    name: "Dr. Li Wei",
    role: "Member",
    affiliation: "Tsinghua University",
    country: "China",
    bio: "Dr. Wei is an expert in network security and has developed several innovative intrusion detection systems.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "li.wei@example.com",
    },
  },
  {
    id: 8,
    name: "Prof. David Smith",
    role: "Member",
    affiliation: "University of Oxford",
    country: "United Kingdom",
    bio: "Professor Smith specializes in cybersecurity policy and the ethical implications of surveillance technologies.",
    image: "/placeholder.svg?height=300&width=300",
    links: {
      email: "david.smith@example.com",
      website: "https://example.com/dsmith",
    },
  },
]

// Filter options for committee roles
const roleFilters: MemberRole[] = [
  "Chair",
  "Co-Chair",
  "Technical Program Chair",
  "Publications Chair",
  "Publicity Chair",
  "Local Arrangements Chair",
  "Member",
]

const ConferenceCommittee: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>("all")

  // Filter members based on selected role
  const filteredMembers =
    selectedRole === "all" ? committeeMembers : committeeMembers.filter((member) => member.role === selectedRole)

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-900 to-[#F5A051] text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Conference Committee</h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
              Society for Cyber Intelligence Systems - Leading experts in cybersecurity and intelligence systems
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto max-w-6xl px-4 py-12">
          {/* Committee Description */}
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-[#F5A051] mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Our Committee</h2>
            </div>
            <p className="text-lg text-gray-600 max-w-4xl">
              The organizing committee brings together leading experts from around the world in the fields of
              cybersecurity, artificial intelligence, and intelligence systems. Our members represent top academic
              institutions and industry organizations committed to advancing the state of the art in cyber intelligence
              systems.
            </p>
          </div>

          {/* Role Filter */}
          <div className="mb-10">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Filter by Role:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRole("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedRole === "all" ? "bg-[#F5A051] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All Roles
              </button>
              {roleFilters.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedRole === role ? "bg-[#F5A051] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Committee Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                      <div className="bg-[#F5A051]/20 text-[#F5A051] text-xs font-semibold px-2.5 py-0.5 rounded inline-block mb-1">
                        {member.role}
                      </div>
                      <p className="text-gray-600 text-sm">
                        {member.affiliation}, {member.country}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 text-sm">{member.bio}</p>

                  {/* Social Links */}
                  {member.links && (
                    <div className="mt-4 flex space-x-3">
                      {member.links.email && (
                        <a
                          href={`mailto:${member.links.email}`}
                          className="text-gray-500 hover:text-[#F5A051]"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.website && (
                        <a
                          href={member.links.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#F5A051]"
                          aria-label={`${member.name}'s website`}
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.linkedin && (
                        <a
                          href={member.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#F5A051]"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.links.twitter && (
                        <a
                          href={member.links.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#F5A051]"
                          aria-label={`${member.name}'s Twitter profile`}
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-[#F5A051]/10 rounded-xl p-8 border border-[#F5A051]/20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Join Our Committee</h3>
            <p className="text-gray-600 mb-6">
              We're always looking for distinguished professionals to join our committee. If you're interested in
              contributing to the advancement of cyber intelligence systems, please contact us.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-[#F5A051] text-white font-medium rounded-lg hover:bg-[#e08c3e] transition-colors"
            >
              Contact Us
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} Society for Cyber Intelligence Systems. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}

export default ConferenceCommittee

