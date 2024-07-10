

// Page.tsx

"use client";

import { useState } from 'react';
import DynamicForm from '../app/components/DynamicForm';
import FormSelection from '../app/components/FormSelection';
import { FormConfig } from '../app/types';

// Define multiple forms (for demonstration, you can add more forms here)
const forms: FormConfig[] = [
 
    {
      name: "Form 3",
      formId: 3,
      steps: [
        {
          label: "SPECIMEN",
          controls: [
            {
              type: "checkbox-group",
              controlName: "procedure",
              label: "Procedure",
              options: [
                {
                  label: "Excision (less than total mastectomy)",
                  value: "excision",
                  controlName: "excision",
                  children: []
                },
                {
                  label: "Total mastectomy (including nipple-sparing and skin-sparing mastectomy)",
                  value: "totalMastectomy",
                  controlName: "totalMastectomy",
                  children: []
                },
                {
                  label: "Other (specify):",
                  value: "otherSpecifyProcedure",
                  type: "input",
                  controlName: "otherSpecifyProcedureInput",
                  inputLabel: "Please specify",
                  children: []
                },
                {
                  label: "Not specified",
                  value: "notSpecifiedProcedure",
                  controlName: "notSpecifiedProcedure",
                  children: []
                }
              ]
            },
            {
              type: "checkbox-group",
              controlName: "specimenLaterality",
              label: "Specimen Laterality",
              options: [
                {
                  label: "Right",
                  value: "right",
                  controlName: "right",
                  children: []
                },
                {
                  label: "Left",
                  value: "left",
                  controlName: "left",
                  children: []
                },
                {
                  label: "Not specified",
                  value: "notSpecifiedLaterality",
                  controlName: "notSpecifiedLaterality",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Tumor Site",
          controls: [
            {
              type: "checkbox-group",
              controlName: "tumorSite",
              label: "Tumor Site (select all that apply)",
              options: [
                {
                  label: "Upper outer quadrant",
                  value: "upperOuterQuadrant",
                  controlName: "upperOuterQuadrant",
                },
                {
                  label: "Lower outer quadrant",
                  value: "lowerOuterQuadrant",
                  controlName: "lowerOuterQuadrant",
                },
                {
                  label: "Upper inner quadrant",
                  value: "upperInnerQuadrant",
                  controlName: "upperInnerQuadrant",
                },
                {
                  label: "Lower inner quadrant",
                  value: "lowerInnerQuadrant",
                  controlName: "lowerInnerQuadrant",
                },
                {
                  label: "Central",
                  value: "central",
                  controlName: "central",
                },
                {
                  label: "Nipple",
                  value: "nipple",
                  controlName: "nipple",
                },
                {
                  label: "Clock position",
                  value: "clockPosition",
                  controlName: "clockPosition",
                  children: [
                    {
                      type: "checkbox-group",
                      controlName: "clockPositionOptions",
                      label: "",
                      options: [
                        {
                          label: "1 o'clock",
                          value: "oneOclock",
                          controlName: "oneOclock",
                          children: []
                        },
                        {
                          label: "2 o'clock",
                          value: "twoOclock",
                          controlName: "twoOclock",
                          children: []
                        },
                        {
                          label: "3 o'clock",
                          value: "threeOclock",
                          controlName: "threeOclock",
                          children: []
                        },
                        {
                          label: "4 o'clock",
                          value: "fourOclock",
                          controlName: "fourOclock",
                          children: []
                        },
                        {
                          label: "5 o'clock",
                          value: "fiveOclock",
                          controlName: "fiveOclock",
                          children: []
                        },
                        {
                          label: "6 o'clock",
                          value: "sixOclock",
                          controlName: "sixOclock",
                          children: []
                        },
                        {
                          label: "7 o'clock",
                          value: "sevenOclock",
                          controlName: "sevenOclock",
                          children: []
                        },
                        {
                          label: "8 o'clock",
                          value: "eightOclock",
                          controlName: "eightOclock",
                          children: []
                        },
                        {
                          label: "9 o'clock",
                          value: "nineOclock",
                          controlName: "nineOclock",
                          children: []
                        },
                        {
                          label: "10 o'clock",
                          value: "tenOclock",
                          controlName: "tenOclock",
                          children: []
                        },
                        {
                          label: "11 o'clock",
                          value: "elevenOclock",
                          controlName: "elevenOclock",
                          children: []
                        },
                        {
                          label: "12 o'clock",
                          value: "twelveOclock",
                          controlName: "twelveOclock",
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "Specify distance from nipple in Centimeters (cm)",
                  value: "specifyDistanceFromNipple",
                  type: "input",
                  controlName: "distanceFromNipple",
                  inputLabel: "Enter distance (in cm)",
                  children: []
                },
                {
                  label: "Other (specify)",
                  value: "otherSpecify",
                  type: "input",
                  controlName: "otherSpecifyInput",
                  inputLabel: "Please specify",
                  children: []
                },
                {
                  label: "Not specified",
                  value: "notSpecified",
                  controlName: "notSpecified",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Tumor Size",
          controls: [
            {
              type: "checkbox-group",
              controlName: "tumorSize",
              label: " ",
              options: [
                {
                  type: "input",
                  controlName: "greatestDimension",
                  label: "Greatest dimension in Millimeters (mm)",
                  value: "",
                  inputLabel: "Dimensions (in mm)",
                  children: [
                    {
                      type: "checkbox-input",
                      controlName: "additionalDimension",
                      label: "Additional Dimension in Millimeters (mm)",
                      inputLabel: "Enter additional dimensions (in mm)"
                    }
                  ]
                },
                {
                  type: "input",
                  controlName: "cannotBeDetermined",
                  label: "Cannot be determined (explain)",
                  value: "cannotBeDetermined",
                  inputLabel: "Please explain",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Histologic Type (Note A)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "histologicType",
              label: "Histologic Type",
              options: [
                {
                  label: "Phyllodes tumor, benign",
                  value: "benign",
                  controlName: "benign",
                  children: []
                },
                {
                  label: "Phyllodes tumor, borderline",
                  value: "borderline",
                  controlName: "borderline",
                  children: []
                },
                {
                  label: "Phyllodes tumor, malignant",
                  value: "malignant",
                  controlName: "malignant",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Stromal Cellularity (Note B)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "stromalCellularity",
              label: "Stromal Cellularity",
              options: [
                {
                  label: "Mild (stromal nuclei are non-overlapping)",
                  value: "mild",
                  controlName: "mild",
                  children: []
                },
                {
                  label: "Moderate (some overlapping stromal nuclei)",
                  value: "moderate",
                  controlName: "moderate",
                  children: []
                },
                {
                  label: "Marked (many overlapping stromal nuclei)",
                  value: "marked",
                  controlName: "marked",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Stromal Atypia (Note C)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "stromalAtypia",
              label: "Stromal Atypia",
              options: [
                {
                  label: "None",
                  value: "none",
                  controlName: "none",
                  children: []
                },
                {
                  label: "Mild (minimal variation in nuclear size, even chromatin, and smooth nuclear contours)",
                  value: "mild",
                  controlName: "mild",
                  children: []
                },
                {
                  label: "Moderate (more variation in nuclear size and irregular nuclear membranes)",
                  value: "moderate",
                  controlName: "moderate",
                  children: []
                },
                {
                  label: "Marked (marked nuclear pleomorphism, hyperchromasia, and irregular nuclear contours)",
                  value: "marked",
                  controlName: "marked",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Stromal Overgrowth (Note D)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "stromalOvergrowth",
              label: "Stromal Overgrowth",
              options: [
                {
                  label: "Absent",
                  value: "absent",
                  controlName: "absent",
                  children: []
                },
                {
                  label: "Present",
                  value: "present",
                  controlName: "present",
                  children: []
                },
                {
                  label: "Cannot be determined",
                  value: "cannotDetermine",
                  controlName: "cannotDetermine",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Mitotic Rate (Note E)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "mitoticRate",
              label: "Mitotic Rate",
              options: [
                {
                  label: "Specify number of mitoses per square Millimeter (mm):",
                  value: "specifyNumber",
                  controlName: "specifyNumber",
                  children: [
                    {
                      type: "input",
                      label: "Specify mitoses",
                      controlName: "mitosesPerMm",
                      inputLabel: "Specify mitoses per mm²"
                    }
                  ]
                },
                {
                  label: "Cannot be determined",
                  value: "cannotDetermine",
                  controlName: "cannotDetermine",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Histologic Tumor Border",
          controls: [
            {
              type: "checkbox-group",
              controlName: "tumorBorder",
              label: "Histologic Tumor Border",
              options: [
                {
                  label: "Circumscribed (well-defined; pushing)",
                  value: "circumscribed",
                  controlName: "circumscribed",
                  children: []
                },
                {
                  label: "Infiltrative (permeative)",
                  value: "infiltrative",
                  controlName: "infiltrative",
                  children: [
                    {
                      type: "checkbox-group",
                      controlName: "infiltrativeDetail",
                      label: "",
                      options: [
                        {
                          label: "Focal",
                          value: "focal",
                          controlName: "focal",
                          children: []
                        },
                        {
                          label: "Extensive",
                          value: "extensive",
                          controlName: "extensive",
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "Cannot be determined",
                  value: "cannotDetermine",
                  controlName: "cannotDetermine",
                  children: []
                }
              ]
            }
          ]
        },
        {
          label: "Malignant Heterologous Elements (Note F)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "heterologousElements",
              label: "Malignant Heterologous Elements",
              options: [
                {
                  label: "Not identified",
                  value: "notIdentified",
                  controlName: "notIdentified",
                  children: []
                },
                {
                  label: "Liposarcoma (excluding well-differentiated liposarcoma)",
                  value: "liposarcoma",
                  controlName: "liposarcoma",
                  children: []
                },
                {
                  label: "Osteosarcoma",
                  value: "osteosarcoma",
                  controlName: "osteosarcoma",
                  children: []
                },
                {
                  label: "Chondrosarcoma",
                  value: "chondrosarcoma",
                  controlName: "chondrosarcoma",
                  children: []
                },
                {
                  label: "Other (specify):",
                  value: "other",
                  controlName: "other",
                  children: [
                    {
                      type: "input",
                      label: "Specify other element",
                      controlName: "otherHeterologousElement",
                      inputLabel: "Specify other element"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "Margin Status for Phyllodes Tumor",
          controls: [
            {
              type: "checkbox-group",
              controlName: "phyllodesTumorStatus",
              label: " ",
              options: [
                {
                  label: "All margins negative for phyllodes tumor",
                  value: "allMarginsNegative",
                  controlName: "allMarginsNegative",
                  children: [
                    {
                      type: "checkbox-group",
                      controlName: "closestMargins",
                      label: "Closest Margin(s) to Phyllodes Tumor (select all that apply)",
                      options: [
                        {
                          label: "Anterior",
                          value: "anterior",
                          controlName: "anterior",
                          children: []
                        },
                        {
                          label: "Posterior",
                          value: "posterior",
                          controlName: "posterior",
                          children: []
                        },
                        {
                          label: "Other (specify):",
                          value: "other",
                          type: "input",
                          controlName: "otherClosestMargin",
                          inputLabel: "Please specify",
                          children: []
                        },
                        {
                          label: "Cannot be determined (explain):",
                          value: "cannotDetermine",
                          type: "input",
                          controlName: "cannotDetermineClosestMargin",
                          inputLabel: "Please explain",
                          children: []
                        }
                      ]
                    },
                    {
                      type: "radio-group",
                      controlName: "distanceToClosestMargin",
                      label: "Distance from Phyllodes Tumor to Closest Margin. Specify in Millimeters (mm)",
                      options: [
                        {
                          label: "Exact distance:",
                          value: "exactDistance",
                          type: "input",
                          controlName: "exactDistanceInput",
                          inputLabel: "Enter exact distance (in mm)",
                          children: []
                        },
                        {
                          label: "Less than:",
                          value: "lessThan",
                          type: "input",
                          controlName: "lessThanInput",
                          inputLabel: "Enter value (in mm)",
                          children: []
                        },
                        {
                          label: "Greater than:",
                          value: "greaterThan",
                          type: "input",
                          controlName: "greaterThanInput",
                          inputLabel: "Enter value (in mm)",
                          children: []
                        },
                        {
                          label: "Other (specify):",
                          value: "otherDistance",
                          type: "input",
                          controlName: "otherDistanceInput",
                          inputLabel: "Please specify distance (in mm)",
                          children: []
                        },
                        {
                          label: "Cannot be determined (explain):",
                          value: "cannotDetermineDistance",
                          type: "input",
                          controlName: "cannotDetermineDistanceInput",
                          inputLabel: "Please explain",
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "Phyllodes tumor present at margin",
                  value: "tumorPresentAtMargin",
                  controlName: "tumorPresentAtMargin",
                  children: [
                    {
                      type: "checkbox-group",
                      controlName: "marginsInvolved",
                      label: "Margin(s) Involved by Phyllodes Tumor (select all that apply)",
                      options: [
                        {
                          label: "Medial",
                          value: "medial",
                          controlName: "medial",
                          children: []
                        },
                        {
                          label: "Lateral",
                          value: "lateral",
                          controlName: "lateral",
                          children: []
                        },
                        {
                          label: "Other (specify):",
                          value: "otherInvolved",
                          type: "input",
                          controlName: "otherInvolvedInput",
                          inputLabel: "Please specify",
                          children: []
                        },
                        {
                          label: "Cannot be determined (explain):",
                          value: "cannotDetermineInvolved",
                          type: "input",
                          controlName: "cannotDetermineInvolvedInput",
                          inputLabel: "Please explain",
                          children: []
                        }
                      ]
                    }
                  ]
                },
                {
                  label: "Other (specify):",
                  value: "otherInvolved",
                  type: "input",
                  controlName: "otherInvolvedInput",
                  inputLabel: "Please specify",
                  children: []
                },
                {
                  label: "Cannot be determined (explain):",
                  value: "cannotDetermineInvolved",
                  type: "input",
                  controlName: "cannotDetermineInvolvedInput",
                  inputLabel: "Please explain",
                  children: []
                }
              ]
            },
            {
              label: "Margin Comment",
              type: "checkbox-input",
              controlName: "MarginComment",
              inputLabel: "Comment here",
            }
          ]
        },
        {
          label: "REGIONAL LYMPH NODES",
          controls: [
            {
              type: "checkbox-group",
              controlName: "regionalLymphNodeStatus",
              label: "Regional Lymph Node Status",
              options: [
                {
                  label: "Not applicable (no regional lymph nodes submitted or found)",
                  value: "notApplicable",
                  controlName: "notApplicable",
                  children: []
                },
                {
                  label: "Regional lymph nodes present",
                  value: "regionalLymphNodesPresent",
                  controlName: "regionalLymphNodesPresent",
                  children: [
                    {
                      type: "checkbox-group",
                      controlName: "regionalNodesDetail",
                      label: "",
                      options: [
                        {
                          label: "All regional lymph nodes negative for tumor",
                          value: "allNegative",
                          controlName: "allNegative",
                          children: []
                        },
                        {
                          label: "Tumor present in regional lymph nodes",
                          value: "tumorPresent",
                          controlName: "tumorPresent",
                          children: [
                            {
                              type: "checkbox-group",
                              controlName: "nodesWithTumor",
                              label: "Number of Lymph Nodes with Tumor",
                              options: [
                                {
                                  label: " Exact number (specify): ",
                                  value: "exact",
                                  type: "input",
                                  controlName: "exactNumber",
                                  inputLabel: "Enter distance (in cm)",
                                  children: []
                                },
                                {
                                  label: " At least (specify): ",
                                  value: "atLeast",
                                  type: "input",
                                  controlName: "atLeastSpecify",
                                  inputLabel: "Enter distance (in cm)",
                                  children: []
                                },
                                {
                                  label: "Other (specify):",
                                  value: "otherSpecify",
                                  type: "input",
                                  controlName: "others",
                                  inputLabel: "Please specify",
                                  children: []
                                },
                                {
                                  label: "Cannot be determined (explain):",
                                  value: "cannotDetermine",
                                  type: "input",
                                  controlName: "cannotDetermine",
                                  inputLabel: "Please explain",
                                  children: []
                                },
                              ]
                            }
                          ]
                        },
                        {
                          label: "Other (specify):",
                          value: "otherSpecify",
                          type: "input",
                          controlName: "others",
                          inputLabel: "Please specify",
                          children: []
                        },
                        {
                          label: "Cannot be determined (explain):",
                          value: "cannotDetermine",
                          type: "input",
                          controlName: "cannotDetermine",
                          inputLabel: "Please explain",
                          children: []
                        },
                        {
                          label: "Number of Lymph Nodes Examined",
                          value: "lymphNodesExamined",
                          controlName: "lymphNodesExamined",
                          children: [
                            {
                              type: "checkbox-group",
                              controlName: "lymphNodes",
                              label: "",
                              options: [
                                {
                                  label: " Exact number (specify): ",
                                  value: "exact",
                                  type: "input",
                                  controlName: "exactNumber",
                                  inputLabel: "Enter distance (in cm)",
                                  children: []
                                },
                                {
                                  label: " At least (specify): ",
                                  value: "atLeast",
                                  type: "input",
                                  controlName: "atLeastSpecify",
                                  inputLabel: "Enter distance (in cm)",
                                  children: []
                                },
                                {
                                  label: "Other (specify):",
                                  value: "otherSpecify",
                                  type: "input",
                                  controlName: "others",
                                  inputLabel: "Please specify",
                                  children: []
                                },
                                {
                                  label: "Cannot be determined (explain):",
                                  value: "cannotDetermine",
                                  type: "input",
                                  controlName: "cannotDetermine",
                                  inputLabel: "Please explain",
                                  children: []
                                },
                              ]
                            }
                          ]
                        },
                      ]
                    }
                  ]
                }
              ]
            },
            {
              label: "+Regional Lymph Node Comment:",
              type: "input",
              controlName: "LymphNodeComment",
              inputLabel: "Please explain",
            }
          ]
        },
        {
          label: "DISTANT METASTASIS",
          controls: [
            {
              type: "checkbox-group",
              controlName: "distantMetastasis",
              label: "Distant Site(s) Involved, if applicable",
              options: [
                {
                  label: "Not applicable",
                  value: "notApplicable",
                  controlName: "notApplicable",
                  children: []
                },
                {
                  label: "Other (specify):",
                  value: "otherSpecify",
                  type: "input",
                  controlName: "others",
                  inputLabel: "Please specify",
                  children: []
                },
                {
                  label: "Cannot be determined (explain):",
                  value: "cannotDetermine",
                  type: "input",
                  controlName: "cannotDetermine",
                  inputLabel: "Please explain",
                  children: []
                },
              ]
            }
          ]
        },
        {
          label: "PATHOLOGIC STAGE CLASSIFICATION (pTNM, AJCC 8th Edition) (Note G)",
          controls: [
            {
              type: "checkbox-group",
              controlName: "pathologicStage",
              label: "Pathologic Stage Classification (pTNM, AJCC 8th Edition) (required only if the tumor is malignant)",
              options: [
                {
                  label: "Not applicable",
                  value: "notApplicable",
                  controlName: "notApplicable",
                  children: []
                },
                {
                  label: "Tumor is malignant",
                  value: "tumorMalignant",
                  controlName: "tumorMalignant",
                  children: [
                    {
                      type: "checkbox-group",
                      controlName: "tnmDescriptors",
                      label: "TNM Descriptors (select all that apply)",
                      options: [
                        {
                          label: "Not applicable",
                          value: "notApplicable",
                          controlName: "notApplicable",
                          children: []
                        },
                        {
                          label: "m (multiple)",
                          value: "multiple",
                          controlName: "multiple",
                          children: []
                        },
                        {
                          label: "r (recurrent)",
                          value: "recurrent",
                          controlName: "recurrent",
                          children: []
                        },
                        {
                          label: "y (post treatment)",
                          value: "postTreatment",
                          controlName: "postTreatment",
                          children: []
                        }
                      ]
                    },
                    {
                      type: "checkbox-group",
                      controlName: "pTCategory",
                      label: "pT Category",
                      options: [
                        {
                          label: "pT not assigned (cannot be determined based on available pathological information)",
                          value: "pTNotAssigned",
                          controlName: "pTNotAssigned",
                          children: []
                        },
                        {
                          label: "pT0: No evidence of primary tumor",
                          value: "pT0",
                          controlName: "pT0",
                          children: []
                        },
                        {
                          label: "pT1: Tumor 5 cm or less in greatest dimension",
                          value: "pT1",
                          controlName: "pT1",
                          children: []
                        },
                        {
                          label: "pT2: Tumor more than 5 cm but not more than 10 cm",
                          value: "pT2",
                          controlName: "pT2",
                          children: []
                        },
                        {
                          label: "pT3: Tumor more than 10 cm but not more than 15 cm",
                          value: "pT3",
                          controlName: "pT3",
                          children: []
                        },
                        {
                          label: "pT4: Tumor more than 15 cm in greatest dimension",
                          value: "pT4",
                          controlName: "pT4",
                          children: []
                        }
                      ]
                    },
                    {
                      type: "checkbox-group",
                      controlName: "pNCategory",
                      label: "pN Category",
                      options: [
                        {
                          label: "pN not assigned (no nodes submitted or found)",
                          value: "pNNotAssignedNoNodes",
                          controlName: "pNNotAssignedNoNodes",
                          children: []
                        },
                        {
                          label: "pN not assigned (cannot be determined based on available pathological information)",
                          value: "pNNotAssignedCannotDetermine",
                          controlName: "pNNotAssignedCannotDetermine",
                          children: []
                        },
                        {
                          label: "pN0: No regional lymph node metastasis",
                          value: "pN0",
                          controlName: "pN0",
                          children: []
                        },
                        {
                          label: "pN1: Regional lymph node metastasis",
                          value: "pN1",
                          controlName: "pN1",
                          children: []
                        }
                      ]
                    },
                    {
                      type: "checkbox-group",
                      controlName: "pMCategory",
                      label: "pM Category (required only if confirmed pathologically)",
                      options: [
                        {
                          label: "Not applicable - pM cannot be determined from the submitted specimen(s)",
                          value: "notApplicablePM",
                          controlName: "notApplicablePM",
                          children: []
                        },
                        {
                          label: "pM1: Distant metastasis",
                          value: "pM1",
                          controlName: "pM1",
                          children: []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          label: "ADDITIONAL FINDINGS",
          controls: [
            {
              type: "checkbox-group",
              controlName: "additionalFindings",
              label: "Additional Findings (select all that apply)",
              options: [
                {
                  label: "Fibroepithelial proliferation (coexisting fibroadenoma or fibroadenomatoid change in the tissue surrounding the phyllodes tumor)",
                  value: "fibroepithelialProliferation",
                  controlName: "fibroepithelialProliferation",
                  children: []
                },
                {
                  label: "Atypical ductal hyperplasia",
                  value: "atypicalDuctalHyperplasia",
                  controlName: "atypicalDuctalHyperplasia",
                  children: []
                },
                {
                  label: "Atypical lobular hyperplasia",
                  value: "atypicalLobularHyperplasia",
                  controlName: "atypicalLobularHyperplasia",
                  children: []
                },
                {
                  label: "Other (specify):",
                  value: "otherSpecify",
                  type: "input",
                  controlName: "others",
                  inputLabel: "Please specify",
                  children: []
                },
              ]
            }
          ]
        },
        {
          label: "COMMENTS",
          controls: [
            {
              type: "input",
              controlName: "comments",
              label: "Comment(s):",
              inputLabel: "Enter comments"
            }
          ]
        }
      ],
    },
  
];



export default function Home() {
  const [selectedForm, setSelectedForm] = useState<FormConfig | null>(null);

  const handleFormSelected = (formId: string) => {
    const form = forms.find(f => f.formId === parseInt(formId));
    setSelectedForm(form || null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <FormSelection forms={forms} onFormSelected={handleFormSelected} />
      {selectedForm && <DynamicForm key={selectedForm.formId} formConfig={selectedForm} />}
    </div>
  );
}


