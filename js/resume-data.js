// Central data file for resume and portfolio
// Edit this file to update both your website and resume generator

const resumeData = {
    // Personal Info
    name: "James Williams",
    subtitle: "Robotics & Computer Vision Engineer | Autonomous Systems",
    location: "Detroit, Michigan",
    
    // Contact
    contact: {
        email: "will4379@msu.edu",
        phone: "(734) 394-8207",
        website: "WeWantWilliams.com",
        github: "github.com/MustardWombat",
        githubUrl: "https://github.com/MustardWombat",
        linkedin: "linkedin.com/in/james-williams-491329317",
        linkedinUrl: "https://www.linkedin.com/in/james-williams-491329317/"
    },

    // Education
    education: [
        {
            school: "Michigan State University, College of Engineering",
            location: "East Lansing, MI",
            degree: "Technology Engineering, Mechatronics Concentration, CS minor",
            gpa: "3.4",
            date: "August 2024 - May 2028"
        }
    ],

    // Skills - categorized for resume format
    skills: {
        programming: "Python, C++, C#, Java, JavaScript",
        robotics_perception: "ROS2, sensor fusion, RTK-GPS, IMU, OpenCV, MMPose, YOLO, TensorFlow, PyTorch",
        hardware: "CAN, Motor Controllers, Sensors, Wheel Angle Sensor, Hydraulic Valve",
        data_ml: "pandas, NumPy, matplotlib, ONNX",
        tools: "Git, Docker, SLURM, Qt, MQTT, Vite, React, Node.js"
    },

    // Experience with research projects nested under the role
    experience: [
        {
            title: "Undergraduate Research Assistant",
            organization: "Michigan State University",
            department: "Department of Biosystems and Agricultural Engineering",
            location: "East Lansing, Michigan",
            date: "September 2025 - Present",
            // These are research projects done as part of this role
            researchProjects: [
                {
                    title: "Autosteer Tractor Guidance System",
                    bullets: {
                        compact: [
                            "Developed and validated autonomous tractor guidance achieving ±2 cm cross-track accuracy using RTK-GNSS with radio-linked base station and proportional hydraulic steering control",
                            "Engineered custom data-logging application forking AgOpenGPS to capture real-time position, heading, and cross-track error at 10 Hz for post-processing analysis",
                            "Tuned PID steering parameters through iterative field testing; diagnosed and resolved RTK correction dropouts achieving 99.5%+ fix availability"
                        ],
                        all: [
                                                        "Led system integration and field testing for auto-steer tractor guidance (±2 cm accuracy, RTK-GNSS, hydraulic steering).",
                                                        "Primary implementer for autonomous implement control system, solving plant occlusion and growth stage adaptation for MSU horticulture site.",
                                                        "Built custom data-logging and analysis pipeline (AgOpenGPS, Python, pandas, matplotlib) for quantitative performance evaluation.",
                                                        "Optimized PID steering and RTK correction reliability for robust operation across variable field conditions."
                        ],
                        robotics: [
                            "Developed and validated autonomous tractor guidance achieving ±2 cm cross-track accuracy using dual-frequency RTK-GNSS (u-blox F9P) with NTRIP corrections from a radio-linked base station, integrated with proportional hydraulic steering valve control",
                            "Engineered custom data-logging application forking AgOpenGPS to capture real-time latitude, longitude, heading, velocity, and cross-track error (XTE) at 10 Hz, exporting to timestamped CSV files for post-processing analysis",
                            "Performed quantitative accuracy analysis using Python (pandas, matplotlib) to generate XTE histograms, trajectory overlay plots, and statistical summaries demonstrating sub-inch guidance precision across multiple field trials",
                            "Tuned PID steering parameters through iterative field testing to improve steering stability and accuracy during headland turns.",
                            "Diagnosed and resolved RTK correction dropouts by transitioning from cellular NTRIP to 900 MHz radio link with dedicated base station, achieving 99.5%+ RTK fix availability"
                        ],
                        mechatronics: [
                            "Integrated proportional hydraulic steering valve with PWM control signal from Arduino-based steering controller, calibrating valve response curves for smooth steering actuation",
                            "Designed electrical system architecture connecting RTK-GNSS receiver, IMU, wheel angle sensor (WAS), and steering controller via RS232/USB interfaces with proper grounding and EMI shielding",
                            "Implemented wheel angle sensor calibration procedure using linear regression to map analog voltage readings to steering angle degrees with ±0.5° accuracy",
                            "Developed wiring harness with weatherproof Deutsch connectors for tractor cab installation, including 12V power distribution with fuse protection and CAN-bus termination",
                            "Validated control system performance through 50+ hours of field operation across varying soil conditions, speeds (2-8 mph), and implement configurations"
                        ],
                        software: [
                            "Forked AgOpenGPS C# codebase to implement standalone telemetry logging module, separating data capture from UI rendering for improved performance and modularity",
                            "Developed Python analysis pipeline using pandas DataFrames for CSV ingestion, NumPy for statistical calculations (mean, std, percentiles), and matplotlib for publication-quality trajectory visualizations",
                            "Implemented multi-threaded data capture architecture to prevent UI blocking during high-frequency (10 Hz) GNSS data logging with thread-safe queue buffering",
                            "Built configuration file parser for runtime adjustment of logging parameters, file paths, and serial port settings without recompilation",
                            "Prepared upstream pull request documentation following AgOpenGPS contribution guidelines, including feature description, testing methodology, and backwards compatibility notes"
                        ],
                        "computer-vision": [
                            "Integrated GNSS telemetry logging for trajectory analysis, enabling overlay visualization of planned vs. actual vehicle paths using matplotlib geospatial plotting",
                            "Built Python data pipeline for accuracy evaluation generating histograms, scatter plots, and statistical summaries from 10 Hz position data across multi-acre field trials",
                            "Developed visualization tools for real-time XTE monitoring with color-coded accuracy bands for operator feedback"
                        ]
                    }
                },
                {
                    title: "Piglet Mortality Reduction Keypoint Model",
                    bullets: {
                        compact: [
                            "Developed MMPOSE-based keypoint detection model for piglets, identifying snout, head, left ear, right ear, shoulder, back, and tail from annotated images",
                            "Curated and annotated dataset with diverse lighting conditions and piglet poses for robust keypoint detection",
                            "Exported ONNX model for cross-platform inference and integrated configuration for camera stream input"
                        ],
                        all: [
                            "Owned MMPOSE-based piglet keypoint detection system: dataset curation, model training (HPCC, SLURM), ONNX deployment, and robust posture analysis across lighting/pose/occlusion.",
                        ],
                        "computer-vision": [
                            "Developed MMPOSE-based keypoint detection model for piglets, identifying snout, head, left ear, right ear, shoulder, back, and tail",
                            "Curated and annotated dataset with diverse lighting conditions and piglet poses for robust keypoint detection",
                            "Implemented data augmentation pipeline including random rotation, brightness jitter, horizontal flip, and mosaic augmentation to improve model robustness",
                            "Exported ONNX model for cross-platform inference and integrated configuration for camera stream input"
                        ],
                        software: [
                            "Developed Python training pipeline with automated data augmentation, train/val/test splitting, and experiment tracking using Weights & Biases for hyperparameter comparison",
                            "Implemented SLURM batch scripts for distributed training on HPCC GPU nodes (NVIDIA A100), managing job queuing, resource allocation, and checkpoint saving",
                            "Built inference deployment package using ONNX model export for cross-platform compatibility, with configuration files for camera stream URLs and detection thresholds",
                            "Created data management workflow using Git LFS for version-controlled image datasets with automated annotation validation scripts",
                            "Developed alert notification system using MQTT messaging protocol for real-time posture event streaming to farm management dashboard"
                        ],
                        robotics: [
                            "Integrated computer vision inference pipeline with farm monitoring infrastructure for autonomous real-time behavioral alerts",
                            "Deployed edge computing solution on NVIDIA Jetson for low-latency inference without cloud connectivity requirements",
                            "Implemented sensor fusion approach combining visual posture detection with environmental sensors (temperature, humidity) for comprehensive monitoring"
                        ],
                        mechatronics: [
                            "Designed camera mounting solutions for farrowing crate installation with adjustable angle brackets and weatherproof enclosures rated for high-humidity barn environments",
                            "Integrated edge computing hardware (NVIDIA Jetson) with Power over Ethernet (PoE) infrastructure for simplified single-cable deployment",
                            "Developed thermal management solution for Jetson enclosure maintaining safe operating temperatures in 90°F+ barn conditions"
                        ]
                    }
                },
                {
                    title: "Autonomous Farming Tool Development",
                    bullets: {
                        compact: [
                            "Developing autonomous implement control system for precision depth and position adjustment based on RTK-GNSS guidance and prescription maps",
                            "Implementing ROS2-based control architecture with modular nodes for sensor input, state estimation, and actuator output",
                            "Designing sensor fusion combining RTK positioning, wheel angle feedback, and hydraulic pressure sensing for closed-loop implement control"
                        ],
                        all: [
                            "Designed and implemented the full autonomous implement control system for deployment on MSU horticulture laboratory and research site equipment; primary implementer responsible for adapting to varying plant growth stages and solving plant occlusion challenges. Field deployment planned for diverse real-world conditions.",
                            "Developed precision implement control stack (RTK-GNSS, prescription maps, ROS2) for robust operation across variable soil/crop conditions; built modular architecture and operator interface."
                        ],
                        robotics: [
                            "Developing autonomous implement control system enabling precision depth and position adjustment for tillage equipment based on RTK-GNSS guidance data and prescription maps",
                            "Implementing ROS2-based control architecture with modular nodes for sensor input (/gnss/fix, /implement/feedback), state estimation, motion planning, and actuator output (/hydraulic/cmd)",
                            "Designing sensor fusion algorithm combining RTK positioning (±2 cm), wheel angle feedback (±0.5°), and hydraulic pressure sensing for closed-loop implement control with 1-inch depth accuracy",
                            "Developing state machine logic for implement control sequencing including lowering, working, raising, and transport modes with safety interlocks",
                            "Implementing prescription map parser for variable-rate implement control based on georeferenced field management zones"
                        ],
                        mechatronics: [
                            "Designing hydraulic control interface using proportional solenoid valves with PWM current drivers for precise implement depth adjustment (0.5-inch resolution)",
                            "Developing sensor mounting and wiring solutions for field-hardened operation including vibration-resistant connectors (Deutsch DT series) and IP67-rated enclosures",
                            "Implementing pressure transducer integration for hydraulic load sensing, enabling automatic draft control and obstacle detection",
                            "Creating electrical system architecture with CAN-bus communication between implement controller, tractor ISOBUS, and guidance system",
                            "Designing fail-safe system with watchdog timer and default-raise behavior for safe implement positioning during communication loss"
                        ],
                        software: [
                            "Building ROS2-based control nodes using C++ for real-time performance with Python wrappers for configuration and monitoring interfaces",
                            "Implementing state machine logic using SMACH library for tool operation sequencing with graphical state visualization for debugging",
                            "Developing configuration GUI using Qt/PySide for operator-adjustable parameters (depth setpoints, response rates, zone boundaries) stored in YAML files",
                            "Creating simulation environment in Gazebo for control algorithm testing before field deployment, including hydraulic system dynamics modeling",
                            "Implementing data logging with rosbag2 for post-operation analysis and algorithm tuning using plotjuggler visualization"
                        ],
                        "computer-vision": [
                            "Integrating rear-facing camera system for implement positioning verification and soil disturbance quality assessment",
                            "Developing visual monitoring dashboard displaying real-time camera feeds with overlay graphics showing target vs. actual implement position",
                            "Exploring computer vision approaches for automatic tillage depth estimation from soil surface texture analysis"
                        ]
                    }
                }
            ]
        }
    ],

    // Standalone Projects (not part of research role)
    projects: [
        {
            title: "Road-Rater – Best Beginner Hack & Auto-Owners Insurance Vehicle Safety Award, SpartaHack 11",
            location: "",
            date: "January 2026",
            bullets: {
                compact: [
                    "Developed 36-hour hackathon dashcam safety scoring system using YOLOP neural network for lane detection, drivable area segmentation, and object detection",
                    "Built full-stack web app with React/TypeScript frontend and Node.js backend; implemented video processing pipeline with OpenCV and PyTorch inference",
                    "Won Best Beginner Hack and Auto-Owners Insurance Vehicle Safety Award recognizing practical insurance industry applications"
                ],
                all: [
                    "Led end-to-end development of a dashcam-based driving safety scoring system at SpartaHack 11, owning the design and implementation of the YOLOP neural network pipeline for lane detection, drivable area segmentation, and object detection in real-world video data.",
                    "Designed and implemented lane departure scoring algorithm, quantifying lateral position, deviation frequency, and lane change smoothness from polynomial lane line fitting; delivered actionable safety metrics for users.",
                    "Built and deployed a full-stack web application (React/TypeScript frontend, Node.js backend) with real-time video processing, interactive dashboard, and per-segment safety breakdown, supporting robust user experience under hackathon constraints.",
                    "Engineered backend pipeline integrating Python ML inference (OpenCV, PyTorch YOLOP) at 15 FPS on CPU, optimizing for low-latency and reliability during live demos.",
                    "Project recognized with Best Beginner Hack and Auto-Owners Insurance Vehicle Safety Award, demonstrating practical impact and technical excellence in a competitive environment."
                ],
                "computer-vision": [
                    "Implemented YOLOP (You Only Look Once for Panoptic driving perception) neural network for unified lane detection, drivable area segmentation, and object detection from dashcam video input",
                    "Developed lane departure scoring algorithm using cubic polynomial lane line fitting with RANSAC outlier rejection, calculating lateral offset from lane center in real-world coordinates via camera calibration",
                    "Implemented temporal smoothing using Kalman filtering on lane position estimates to reduce false lane departure detections from video noise and occlusion",
                    "Built video processing pipeline with OpenCV for frame extraction, preprocessing (resize, normalize), and post-processing (NMS, lane line reconstruction) at 15 FPS throughput",
                    "Analyzed model failure cases including adverse weather (rain, glare), worn lane markings, and construction zones, identifying areas for future robustness improvements",
                    "Won Best Beginner Hack and Auto-Owners Insurance Vehicle Safety Award at SpartaHack 11 hackathon"
                ],
                software: [
                    "Architected full-stack application with React 18/TypeScript frontend using Vite build tooling, TailwindCSS styling, and Recharts for interactive safety score visualizations",
                    "Developed Node.js/Express REST API with multer file upload handling, Python subprocess spawning for ML inference, and Server-Sent Events (SSE) for real-time processing progress updates",
                    "Implemented video processing pipeline orchestrating FFmpeg frame extraction, PyTorch YOLOP inference, OpenCV lane analysis, and JSON result aggregation",
                    "Built responsive dashboard UI with video playback synchronized to per-frame safety annotations, segment-by-segment score breakdown, and exportable PDF safety reports",
                    "Deployed application using Docker containerization with multi-stage builds separating Node.js runtime and Python ML dependencies",
                    "Won Best Beginner Hack and Auto-Owners Insurance Vehicle Safety Award at SpartaHack 11 hackathon"
                ],
                robotics: [
                    "Applied autonomous vehicle perception techniques (lane detection, path planning concepts) to consumer dashcam safety analysis application",
                    "Implemented real-time sensor data processing pipeline concepts for video stream analysis with latency-optimized inference",
                    "Developed safety scoring metrics inspired by ADAS (Advanced Driver Assistance Systems) lane keeping assist algorithms"
                ],
                mechatronics: [
                    "Analyzed camera-based sensing integration for vehicle safety monitoring systems, understanding practical deployment constraints",
                    "Evaluated real-time processing requirements for embedded dashcam deployment feasibility on edge computing platforms"
                ]
            }
        },
        {
            title: "ASABE Agricultural Robotics Challenge Robot",
            location: "East Lansing, Michigan",
            date: "2025 - Present",
            bullets: {
                compact: [
                    "Contributing to MSU's ASABE Agricultural Robotics Challenge entry developing autonomous ground robot for crop scouting, weed detection, and targeted intervention",
                    "Implementing ROS2 Humble navigation stack with Nav2 path planning for GPS-denied environments",
                    "Developing custom perception pipeline with Intel RealSense stereo camera and DeepLabv3+ for crop row detection and weed classification"
                ],
                all: [
                    "Contributing to MSU's entry in the ASABE Agricultural Robotics Challenge, developing autonomous ground robot for precision agriculture tasks including crop scouting, weed detection, and targeted intervention",
                    "Implementing ROS2 Humble-based navigation stack with Nav2 for path planning in GPS-denied crop canopy environments",
                    "Developing custom perception pipeline using YOLO object detection and ML neural network for crop row detection and weed classification",
                    "Building sensor fusion architecture using robot_localization package to combine wheel odometry, IMU, RTK-GPS, and visual odometry for robust state estimation",
                    "Designing modular software architecture enabling rapid integration of new sensors and task-specific manipulation payloads"
                ],
                robotics: [
                    "Contributing to MSU's entry in the ASABE Agricultural Robotics Challenge, developing autonomous ground robot for precision agriculture tasks including crop scouting, weed detection, and targeted intervention",
                    "Implementing ROS2 Humble-based navigation stack with Nav2 for global/local path planning, DWB controller for trajectory following, and behavior trees for high-level task sequencing",
                    "Building sensor fusion architecture using robot_localization EKF node to combine wheel odometry (100 Hz), IMU (200 Hz), RTK-GPS (10 Hz), and visual odometry for robust 6-DOF state estimation",
                    "Developing recovery behaviors for common agricultural field scenarios including row-end turning, obstacle avoidance with crop damage minimization, and stuck detection with automatic reversal",
                    "Implementing ROS2 lifecycle node management for clean sensor initialization, parameter loading, and graceful shutdown during field operation"
                ],
                "computer-vision": [
                    "Developing custom perception pipeline using Intel RealSense D435 stereo camera with depth registration for 3D crop structure understanding",
                    "Implementing semantic segmentation using DeepLabv3+ with ResNet-50 backbone, trained on custom agricultural dataset with classes for crop, weed, soil, and residue",
                    "Building crop row detection algorithm using Hough line transform on segmentation masks with temporal filtering for robust row following under partial occlusion",
                    "Developing weed species classification using EfficientNet-B0 with transfer learning from iNaturalist plant dataset, achieving 85% accuracy on 10 common weed species",
                    "Integrating camera with ROS2 using image_transport for compressed streaming and tf2 for extrinsic calibration relative to robot base frame",
                    "Implementing visual odometry using ORB-SLAM3 as backup localization during GPS dropout periods in tree-covered field edges"
                ],
                software: [
                    "Building ROS2 Humble software architecture following modular design principles with standardized message interfaces between perception, planning, and control nodes",
                    "Implementing CI/CD pipeline using GitHub Actions for automated build testing, static analysis (cppcheck, pylint), and documentation generation on pull requests",
                    "Developing simulation environment in Gazebo Ignition with custom agricultural terrain meshes, crop row models, and sensor plugins for camera emulation",
                    "Creating parameter management system using YAML configuration files with runtime-adjustable parameters exposed via ROS2 dynamic_reconfigure",
                    "Contributing to team codebase using Git workflows including feature branches, code review requirements, and semantic versioning for releases",
                    "Documenting API interfaces and system architecture using Sphinx/Doxygen for maintainability and knowledge transfer"
                ],
                mechatronics: [
                    "Designing sensor mounting solutions for stereo camera (adjustable tilt bracket) ensuring stable data collection on uneven terrain",
                    "Developing weatherproof electronics enclosure with IP65 rating, thermal management (cooling fans, heat sinks), and cable strain relief for field operation in dusty, humid conditions",
                    "Implementing motor controller integration via CAN-bus with ROS2 bridge node for velocity command translation and encoder feedback publishing at 100 Hz",
                    "Creating power distribution system with separate battery banks for compute (24V) and drive systems (48V), including emergency stop circuitry and voltage monitoring",
                    "Designing quick-disconnect mounting system for task-specific payloads (spray boom, weeding tool) with standardized electrical and pneumatic interfaces"
                ]
            }
        }
    ],

    // Focus area descriptions for resume header
    focusDescriptions: {
        'all': 'Technology Engineering | Mechatronics | CS Minor',
        'robotics': 'Robotics & Autonomous Systems',
        'computer-vision': 'Computer Vision & Machine Learning',
        'software': 'Software Development',
        'mechatronics': 'Mechatronics Engineering'
    }
};

// Helper function to get all awards for resume
function getAwardsForResume(focus) {
    if (focus === 'all') return resumeData.awards || [];
    return (resumeData.awards || []).filter(award => 
        award.focusAreas && award.focusAreas.includes(focus)
    );
}

// Helper function to get filtered projects
function getFilteredResumeProjects(focus) {
    if (focus === 'all') return resumeData.projects;
    return resumeData.projects.filter(project => 
        project.focusAreas && project.focusAreas.includes(focus)
    );
}
