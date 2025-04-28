"use client"

import { useRef, useState, useEffect } from "react"
import html2canvasPro from "html2canvas-pro"
import { Download, FileText, User,Printer } from "lucide-react"
import { BackgroundBeams } from "../../components/ui/background-beams"
import { CardHoverEffect } from "../../components/ui/card-hover-effect"
import { AnimatedButton } from "../../components/ui/animated-button"

import { HoverBorderGradient } from "../../components/ui/hover-border-gradient"
import { cn } from "@/lib/utils"

const Page = () => {
  const contentRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    date: "",
    yourName: "",
    subject:'',
    gender: "male", // Default to male
    domainName: "",
    reason: "",
    primaryDNS: "",
    secondaryDNS: "",
  })

  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const generatePDF = async () => {
    if (!contentRef.current) return
  
    setIsGenerating(true)
  
    try {
      const input = contentRef.current
  
      // Set fixed dimensions for A4 paper (in pixels at 96 DPI)
      const a4Width = 794 // A4 width in pixels at 96 DPI
      const a4Height = 1123 // A4 height in pixels at 96 DPI
  
      const canvas = await html2canvasPro(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#fff",
        width: a4Width,
        height: a4Height,
        logging: true,
        imageTimeout: 15000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(input.id)
          if (clonedElement) {
            clonedElement.style.width = `${a4Width}px`
            clonedElement.style.height = `${a4Height}px`
            clonedElement.style.overflow = "visible"
          }
        },
      })
  
      // Convert canvas to JPG image
      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      
      // Create a temporary link to download the JPG
      const link = document.createElement('a')
      link.href = imgData
      link.download = 'employment_certificate.jpg'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
  
    } catch (error) {
      console.error("Error generating image:", error)
      alert("There was an error generating the image. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }
  const handlePrint = () => {
    if (!contentRef.current) return

    const printContent = contentRef.current
    const originalContents = document.body.innerHTML

    document.body.innerHTML = printContent.outerHTML

    window.print()

    document.body.innerHTML = originalContents
    window.location.reload()
  }

  // Function to get icon based on field name
  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case "employeeName":
      case "gender":
        return <User size={18} className="text-blue-400" />
      
      default:
        return <FileText size={18} className="text-blue-400" />
    }
  }

  // Function to render form field based on field name
  const renderFormField = (key, value) => {
    if (key === "gender") {
      return (
        <HoverBorderGradient className="rounded-lg overflow-hidden">
          <select
            name={key}
            value={value}
            onChange={handleChange}
            className="bg-gray-900 border-0 rounded-lg px-3 py-3 w-full text-white focus:outline-none transition-all duration-200"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </HoverBorderGradient>
      )
    }

    return (
      <HoverBorderGradient className="rounded-lg overflow-hidden">
        <input
          name={key}
          value={value}
          onChange={handleChange}
          className="bg-gray-900 border-0 rounded-lg px-3 py-3 w-full text-white placeholder:text-gray-500 focus:outline-none transition-all duration-200"
          placeholder={key.replace(/([A-Z])/g, " $1").replace(/^\w/, (c) => c.toUpperCase())}
        />
      </HoverBorderGradient>
    )
  }

  if (!mounted) return null

  return (
    <div className="relative p-6 flex flex-col items-center lg:flex-row lg:justify-center gap-10 bg-black min-h-screen overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />
 

      {/* Certificate preview */}
      <div className="flex w-full lg:w-[45%] justify-center z-10">
        <CardHoverEffect className="w-full" glowColor="rgba(5, 130, 246, 0.5)">
          <div className="bg-gray-900/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border border-gray-800">
            <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white p-4 flex items-center justify-between">
              <h2 className="font-medium flex items-center gap-2">
                <FileText size={18} />
                CoverLetter Preview
              </h2>
              <div className="flex gap-2">
                <AnimatedButton
                  onClick={handlePrint}
                  disabled={isGenerating}
                  className={`bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 text-sm font-medium ${
                    isGenerating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Printer size={16} />
                  Print
                </AnimatedButton>
                <AnimatedButton
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className={`bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 text-sm font-medium ${
                    isGenerating ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  <Download size={16} />
                  {isGenerating ? "Generating..." : "Download"}
                </AnimatedButton>
              </div>
            </div>

            <div className="p-4 overflow-auto sexy-scrollbar max-h-[70vh]">
              <div
                id="certificate-content"
                ref={contentRef}
                className="bg-white p-8 shadow-md text-black w-full max-w-[794px] aspect-[21/29.7] relative overflow-hidden mx-auto flex flex-col items-center border border-gray-300 leading-8"
                style={{ width: "794px", height: "1123px" }}
              >
                    <div className="flex justify-end w-full px-3 py-10">
                      Date: {formData.date}
                    </div>
                    <div className="flex w-full py-10">

                    <h1>
                      To,<br></br>
                      The Hostmaster<br></br>
                      Mercantile Communications Pvt. Ltd.<br></br>
                      Durbar Marg, Kathmandu, Nepal 
                    </h1>
                    </div>
                    <div className="py-10 ">
                      <div className="w-[30%]">

                      </div>
                      Subject:{formData.subject}-{formData.domainName}
                    </div>
                    <div className="flex flex-col gap-10">
                      <h1>
                        Dear Sir/Madam
                      </h1>
                      <h1>
                      I am writing this letter to request you to kindly register a {formData.domainName} domain for me based on my name. I have provided my personal details, and also attached a scanned copy of my citizenship with this letter.I would be very glad if you approve my domain registration request.
                      </h1>{
                        formData.reason ? <>
                         <h1>
                          {formData.reason}
                         </h1>
                        </>:''
                      }
                      <h1>
                      Thank you very much for consideration. I look forward to hearing from you soon.
                      </h1>
                      <div>
                        <h1>
                          Domain:{formData.domainName}<br></br>
                          Primary Name Server :{formData.primaryDNS}<br></br>
                          Secondary Name Server :{formData.secondaryDNS}<br></br>
                        
                        </h1>
                      </div>
                      <div>
                        <h1>
                          Regards,<br></br>
                          {formData.yourName}
                        </h1>
                      </div>
                    </div>
              </div>
            </div>
          </div>
        </CardHoverEffect>
      </div>

      {/* Form section */}
      <div className="w-full lg:w-[45%] z-10">
        <CardHoverEffect className="w-full" glowColor="rgba(59, 130, 246, 0.5)">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl text-white shadow-xl border border-gray-800">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-white flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                <FileText size={20} className="text-blue-400" />
                <span>Cover Letter Details</span>
              </h2>
              <p className="text-gray-400 text-sm">Fill in the information to generate your Cover Letter for Nepal Domain Registration</p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {Object.entries(formData).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-xs font-medium text-gray-300 mb-1.5 ml-1 flex items-center gap-1">
                    {getFieldIcon(key)}
                    {key
                      .split(/(?=[A-Z])/)
                      .join(" ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </label>
                  <div className="relative">{renderFormField(key, val)}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <AnimatedButton
                onClick={generatePDF}
                disabled={isGenerating}
                className={cn(
                  "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
                  isGenerating && "opacity-70 cursor-not-allowed",
                )}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  {isGenerating ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download size={18} className="mr-2" />
                      Download Certificate
                    </>
                  )}
                </span>
              </AnimatedButton>
            </div>
          </div>
        </CardHoverEffect>
      </div>
    </div>
  )
}

export default Page
     