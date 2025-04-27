"use client";

import { useRef, useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvasPro from "html2canvas-pro";
import Image from "next/image";
import {
  Download,
  
  Calendar,
  FileText,
  User,
  Building,
  Briefcase,
  Users,
  MapPin,
  Printer,
} from "lucide-react";
import { BackgroundBeams } from "../../component/ui/background-beams";
import { CardHoverEffect } from "../../component/ui/card-hover-effect";
import { AnimatedButton } from "../../component/ui/animated-button";

import { HoverBorderGradient } from "../../component/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

const Page = () => {
  const contentRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    employeeName: "",
    gender: "male", // Default to male
    
    date: "",
  });

  const [image, setImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get pronouns based on selected gender



  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = async () => {
    if (!contentRef.current) return;

    setIsGenerating(true);

    try {
      const input = contentRef.current;

      // Landscape dimensions (swap width/height)
      const landscapeWidth = 1123; // A4 height becomes width in landscape
      const landscapeHeight = 794; // A4 width becomes height in landscape

      const canvas = await html2canvasPro(input, {
        scale: 2, // Reduced scale for better performance
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#fff",
        width: landscapeWidth,
        height: landscapeHeight,
        logging: false,
        imageTimeout: 5000,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(input.id);
          if (clonedElement) {
            clonedElement.style.width = `${landscapeWidth}px`;
            clonedElement.style.height = `${landscapeHeight}px`;
            clonedElement.style.overflow = "visible";
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.85); // Use JPEG for smaller size

      const pdf = new jsPDF({
        orientation: "landscape", // Changed to landscape
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Landscape dimensions in mm (swap width/height)
      const pdfWidth = 297;
      const pdfHeight = 210;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("employment_certificate.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    if (!contentRef.current) return;

    const printContent = contentRef.current;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.outerHTML;

    window.print();

    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  // Function to get icon based on field name
  const getFieldIcon = (fieldName) => {
    switch (fieldName) {
      case "employeeName":
      case "gender":
        return <User size={18} className="text-blue-400" />;
      case "joiningDate":
      case "lastWorkingDate":
      case "date":
        return <Calendar size={18} className="text-blue-400" />;
      case "designation":
        return <Briefcase size={18} className="text-blue-400" />;
      case "companyName":
        return <Building size={18} className="text-blue-400" />;
      case "departments":
      case "roles":
        return <Users size={18} className="text-blue-400" />;
      case "authorizer":
        return <FileText size={18} className="text-blue-400" />;
      case "companyAddress":
        return <MapPin size={18} className="text-blue-400" />;
      default:
        return <FileText size={18} className="text-blue-400" />;
    }
  };

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
      );
    }

    return (
      <HoverBorderGradient className="rounded-lg overflow-hidden">
        <input
          name={key}
          value={value}
          onChange={handleChange}
          className="bg-gray-900 border-0 rounded-lg px-3 py-3 w-full text-white placeholder:text-gray-500 focus:outline-none transition-all duration-200"
          placeholder={key
            .replace(/([A-Z])/g, " $1")
            .replace(/^\w/, (c) => c.toUpperCase())}
        />
      </HoverBorderGradient>
    );
  };

  if (!mounted) return null;

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

            <div className="p-4 overflow-auto sexy-scrollbar max-h-[70vh]">
              <div
                id="certificate-content"
                ref={contentRef}
                className="p-8 shadow-md text-black w-full max-w-[1123px] aspect-[29.7/21] relative overflow-hidden mx-auto flex flex-col items-center text-center border border-gray-300 mainCert "
                style={{
                  width: "1123px",
                  height: "794px",
                  // backgroundImage: "url('/cer.jpg')",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Image
                  src={"/cer.jpg"}
                  alt="Certificate Background"
                  fill
                  className="object-cover -z-10"
                />
                {/* Image and date */}
                <div className="mt-20 flex justify-center flex-col">

                <h1 className="text-6xl font-serif font-bold">
                          CERTIFICATE 
                       {" "}
                </h1>
                <p className="text-xl text-center">          OF APPRECIATION         </p>
                </div>
                       {" "}
                <p className="mt-6 font-medium ">
                            This certificate is proudly presented to        {" "}
                </p>
                        <h1 className="font-serif text-6xl border-b-2 mt-6 ">       <i>   {formData.employeeName}</i>         </h1>       {" "}
                <div className="w-full flex justify-center mt-6">

                <p className="w-[700px]">
                          This certificate is given to {formData.employeeName} for
                  his achievement during the month of {formData.date}. Hopefully this
                  certificate will be a great motivation.        {" "}
                </p>
                </div>
                 
                <div className="absolute left-50 bottom-20"><div className="w-[230px] h-[250px] border-b-2">

                  </div>
                  <p>
                    Company President Signature
                  </p>  </div> <div className="absolute right-50 bottom-20"><div className="w-[230px] h-[250px] border-b-2">

</div>
<p>
  Company Manager Signature
</p>  </div>
                {/* Certificate content */}
                {/* Certificate footer with gradient */}
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
              <h2 className="text-xl font-semibold mb-2 text-white flex items-center gap-2 bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
                <FileText size={20} className="text-blue-400" />
                <span>Certificate Details</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Fill in the information to generate your employment certificate
              </p>
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
                  isGenerating && "opacity-70 cursor-not-allowed"
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
  );
};

export default Page;
