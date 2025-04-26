"use client"

import { useRef, useState, useEffect } from "react"
import jsPDF from "jspdf"
import html2canvasPro from "html2canvas-pro"
import Image from "next/image"
import { Download, Upload, Calendar, FileText, User, Building, Briefcase, Users, MapPin, Printer } from "lucide-react"
import { BackgroundBeams } from "./ui/background-beams"
import { CardHoverEffect } from "./ui/card-hover-effect"
import { AnimatedButton } from "./ui/animated-button"

import { HoverBorderGradient } from "./ui/hover-border-gradient"
import { cn } from "@/lib/utils"

const PDFGenerator = () => {
  const contentRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    employeeName: "",
    gender: "male", // Default to male
    joiningDate: "",
    lastWorkingDate: "",
    designation: "",
    companyName: "",
    departments: "",
    roles: "",
    authorizer: "",
    companyAddress: "",
    date: "",
  })

  const [image, setImage] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get pronouns based on selected gender
  const getPronouns = () => {
    return formData.gender === "male"
      ? { subject: "he", object: "his", possessive: "him" }
      : { subject: "she", object: "her", possessive: "her" }
  }

  const pronouns = getPronouns()

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

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

      // html2canvas-pro has better rendering capabilities
      const canvas = await html2canvasPro(input, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true, // Allow tainted canvas if needed
        backgroundColor: "#fff",
        width: a4Width,
        height: a4Height,
        logging: true, // Enable logging for debugging
        imageTimeout: 15000, // Longer timeout for images
        onclone: (clonedDoc) => {
          // Any modifications to the cloned document before rendering
          const clonedElement = clonedDoc.getElementById(input.id)
          if (clonedElement) {
            // Ensure all styles are computed and applied
            clonedElement.style.width = `${a4Width}px`
            clonedElement.style.height = `${a4Height}px`
            clonedElement.style.overflow = "visible" // Make sure overflow content is visible
          }
        },
      })

      const imgData = canvas.toDataURL("image/png", 1.0)

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // A4 size in mm
      const pdfWidth = 210
      const pdfHeight = 297

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("employment_certificate.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating the PDF. Please try again.")
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
      case "joiningDate":
      case "lastWorkingDate":
      case "date":
        return <Calendar size={18} className="text-blue-400" />
      case "designation":
        return <Briefcase size={18} className="text-blue-400" />
      case "companyName":
        return <Building size={18} className="text-blue-400" />
      case "departments":
      case "roles":
        return <Users size={18} className="text-blue-400" />
      case "authorizer":
        return <FileText size={18} className="text-blue-400" />
      case "companyAddress":
        return <MapPin size={18} className="text-blue-400" />
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
                Certificate Preview
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

            <div className="p-4 overflow-auto max-h-[70vh]">
              <div
                id="certificate-content"
                ref={contentRef}
                className="bg-white p-8 shadow-md text-black w-full max-w-[794px] aspect-[21/29.7] relative overflow-hidden mx-auto flex flex-col items-center border border-gray-300"
                style={{ width: "794px", height: "1123px" }}
              >
                {/* Certificate header with gradient */}
                <div className="absolute top-0 left-0 w-full h-[50px] bg-gradient-to-r from-blue-50 to-violet-50"></div>

                {/* Image and date */}
                <div className="h-[15%] pt-10 w-full flex justify-between relative z-10">
                  <div className="h-full">
                    {image ? (
                      <div className="relative w-[28mm] h-[28mm]">
                        <Image
                          fill
                          src={image || "/placeholder.svg"}
                          alt="Company Logo"
                          className="rounded-full object-cover border-2 border-blue-100 shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="w-[18mm] h-[18mm] border-2 border-blue-200 rounded-full flex items-center justify-center bg-gray-50 shadow-md">
                        <Building size={24} className="text-blue-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-end pb-4">
                    <p className="text-xs font-medium text-gray-600">Date: {formData.date || "___________"}</p>
                  </div>
                </div>

                {/* Certificate content */}
                <div className="flex flex-col gap-6 mt-4 text-sm">
                  <h2 className="text-center font-bold text-lg text-blue-800 border-b-2 border-blue-200 pb-2 w-fit mx-auto px-4">
                    To Whomsoever It May Concern
                  </h2>
                  <p className="text-black leading-relaxed">
                    This certificate of employment confirms that {formData.gender == "male" ? "Mr." : "Ms."}{" "}
                    <span className="font-medium ">{formData.employeeName || "[Employee Name]"}</span> was a part of our
                    organization from <span className="font-medium">{formData.joiningDate || "[Joining Date]"}</span> to{" "}
                    <span className="font-medium ">{formData.lastWorkingDate || "[Last Working Date]"}</span>.{" "}
                    {pronouns.subject.charAt(0).toUpperCase() + pronouns.subject.slice(1)} held the position of{" "}
                    <span className="font-medium ">{formData.designation || "[Designation]"}</span> in our company{" "}
                    <span className="font-medium">{formData.companyName || "[Company Name]"}</span> but also handled
                    some other departments like{" "}
                    <span className="font-medium ">{formData.departments || "[Departments]"}</span> whenever it was
                    required.
                  </p>

                  <p className="text-black leading-relaxed">
                    During this tenure,{formData.gender == "male" ? "Mr." : "Ms."}{" "}
                    <span className="font-medium ">{formData.employeeName || "[Employee Name]"}</span> has shown great
                    dedication and punctuality. We also approve of {pronouns.possessive} character as an understanding
                    and helpful team member.
                  </p>

                  <p className="text-black leading-relaxed">
                    Moreover, I would like to reflect over {pronouns.object} conduct during {pronouns.object} stay with
                    us. During {pronouns.object} service {pronouns.subject} has been found sincere, reliable,
                    trustworthy, sociable, pleasant and open to challenges {pronouns.subject} has a genial temperament
                    and can efficiently work in a team. All of our staff members are pleased with {pronouns.possessive}{" "}
                    and feels comfortable in teaming and coordinating with {pronouns.possessive} for the realization of
                    organizational goals and objectives.
                  </p>

                  <p className="text-black leading-relaxed">
                    <span className="font-medium ">{formData.employeeName || "[Employee Name]"}</span> is leaving{" "}
                    {pronouns.object} job only on of {pronouns.object} own decision and for attempting opportunities
                    with a better profile. We wish {pronouns.object} all the best in {pronouns.object} future endeavor.
                    Please feel free to contact us for any more details about the employment of{" "}
                    <span className="font-medium">{formData.employeeName || "[Employee Name]"}</span>.
                  </p>
                </div>

                <div className="mt-10 flex flex-col w-full">
                  <p className="font-medium text-black">Sincerely,</p>
                  <p className="font-medium  mt-1">{formData.authorizer || "[Authorizer Name]"}</p>
                  <div className="">
                    <p className="text-black">{formData.companyName || "[Company Name]"}</p>
                    <p className="text-black text-sm">{formData.companyAddress || "[Company Address]"}</p>
                    <div className="flex w-full justify-between mt-8">
                      <div className="flex flex-col items-center">
                        <div className="h-[100px] w-40 border border-dashed border-gray-300 flex items-center justify-center">
                          {/* Signature placeholder */}
                       
                        </div>
                        <div className="mt-2 w-40">
                          <p className="text-black text-center border-t border-gray-300 pt-2 text-sm">
                            Authorizer Signature
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-[100px] w-40 border border-dashed border-gray-300 flex items-center justify-center">
                          {/* Stamp placeholder */}
                        
                        </div>
                        <div className="mt-2 w-40">
                          <p className="text-black text-center border-t border-gray-300 pt-2 text-sm">Company Stamp</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certificate footer with gradient */}
                <div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-r from-blue-50 to-violet-50"></div>
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
                <span>Certificate Details</span>
              </h2>
              <p className="text-gray-400 text-sm">Fill in the information to generate your employment certificate</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-1">
                  <Building size={16} className="text-blue-400" />
                  Company Logo
                </label>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" />
              </div>

              {image ? (
                <div className="relative w-full h-32 bg-gray-800 rounded-lg overflow-hidden group">
                  <Image fill src={image || "/placeholder.svg"} alt="Uploaded" className="object-contain" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <AnimatedButton
                      onClick={() => document.getElementById("image-upload")?.click()}
                      className="bg-blue-600/80 hover:bg-blue-600 p-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                    >
                      <Upload size={16} />
                      <span>Change Logo</span>
                    </AnimatedButton>
                  </div>
                </div>
              ) : (
                <AnimatedButton
                  onClick={() => document.getElementById("image-upload")?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center hover:border-blue-500 transition-all duration-200 bg-gray-800/50"
                >
                  <Upload size={24} className="text-blue-400 mb-2" />
                  <span className="text-gray-400 text-sm">Upload Company Logo</span>
                </AnimatedButton>
              )}
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

export default PDFGenerator
     