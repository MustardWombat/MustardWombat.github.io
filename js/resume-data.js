// Central data file for resume and portfolio
// Edit this file to update both your website and resume generator

const resumeData = {
    // Personal Info
    name: "James Williams",
    subtitle: "Technology Engineering | Mechatronics | CS Minor",
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
            date: "May 2024 - Present",
            coursework: "Mechatronics, Embedded Systems, Control Systems, Circuits, Data Structures, Machine Vision, Smart Agricultural Systems"
        }
    ],

    // Skills - categorized for resume format
    skills: {
        hardware: "PCB design, embedded circuits, wiring diagrams, breadboarding, soldering",
        programming: "Python, C++, C#, Java",
        robotics: "ROS2, PID tuning, GNSS/RTK, sensor fusion",
        tools: "OpenCV, Git, Xcode, VSCode, CAN-bus communication"
    },

    // Experience with research projects nested under the role
    experience: [
        {
            title: "Undergraduate Research Assistant",
            organization: "Michigan State University",
            department: "Department of Biosystems and Agricultural Engineering",
            location: "East Lansing, Michigan",
            date: "September 2024 - Present",
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
                            "Developed and validated autonomous tractor guidance achieving ±2 cm cross-track accuracy using dual-frequency RTK-GNSS (u-blox F9P) with NTRIP corrections from a radio-linked base station, integrated with proportional hydraulic steering valve control",
                            "Engineered custom data-logging application forking AgOpenGPS to capture real-time latitude, longitude, heading, velocity, and cross-track error (XTE) at 10 Hz, exporting to timestamped CSV files for post-processing analysis",
                            "Performed quantitative accuracy analysis using Python (pandas, matplotlib) to generate XTE histograms, trajectory overlay plots, and statistical summaries demonstrating sub-inch guidance precision across multiple field trials",
                            "Tuned cascaded PID steering controller parameters (Kp, Ki, Kd, look-ahead distance, integral windup limits) through iterative field testing, resolving oscillatory steering behavior at headland turns",
                            "Diagnosed and resolved RTK correction dropouts by transitioning from cellular NTRIP to 900 MHz radio link with dedicated base station, achieving 99.5%+ RTK fix availability"
                        ],
                        robotics: [
                            "Developed and validated autonomous tractor guidance achieving ±2 cm cross-track accuracy using dual-frequency RTK-GNSS (u-blox F9P) with NTRIP corrections from a radio-linked base station, integrated with proportional hydraulic steering valve control",
                            "Engineered custom data-logging application forking AgOpenGPS to capture real-time latitude, longitude, heading, velocity, and cross-track error (XTE) at 10 Hz, exporting to timestamped CSV files for post-processing analysis",
                            "Performed quantitative accuracy analysis using Python (pandas, matplotlib) to generate XTE histograms, trajectory overlay plots, and statistical summaries demonstrating sub-inch guidance precision across multiple field trials",
                            "Tuned cascaded PID steering controller parameters (Kp, Ki, Kd, look-ahead distance, integral windup limits) through iterative field testing, resolving oscillatory steering behavior at headland turns",
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
                    title: "Piglet Mortality Reduction Vision System",
                    bullets: {
                        compact: [
                            "Built YOLOv8-based real-time pig posture classification system detecting 5 behavioral states using 1,000+ annotated images across diverse lighting conditions",
                            "Trained models on MSU's HPCC cluster achieving 87% mAP@0.5; deployed production inference on NVIDIA Jetson at 45 FPS to operational swine farm cameras",
                            "Implemented automatic alert system for prolonged lateral lying events indicating crushing risk; identified domain shift limitations for cross-farm deployment"
                        ],
                        all: [
                            "Developed YOLOv8-based real-time pig posture classification system detecting 5 behavioral states (standing, sitting, sternal lying, lateral lying, nursing) to identify at-risk piglets in farrowing crates",
                            "Curated and annotated 1,000+ training images across diverse lighting conditions (natural daylight, artificial barn lighting, IR night vision) using CVAT with strict inter-annotator agreement protocols",
                            "Trained models on MSU's High Performance Computing Cluster (HPCC) using SLURM job scheduling, experimenting with YOLOv8n/s/m variants and hyperparameter optimization (learning rate, augmentation, mosaic)",
                            "Achieved 87% mAP@0.5 on held-out test set with inference speed of 45 FPS on edge deployment hardware (NVIDIA Jetson), enabling real-time posture monitoring",
                            "Deployed production inference pipeline to operational swine farm cameras, implementing automatic alert system for prolonged lateral lying events indicating potential crushing risk",
                            "Identified domain shift limitations during cross-farm deployment due to camera angle and lighting variations, informing future multi-site training data collection strategy"
                        ],
                        "computer-vision": [
                            "Developed YOLOv8-based real-time pig posture classification system detecting 5 behavioral states (standing, sitting, sternal lying, lateral lying, nursing) to identify at-risk piglets in farrowing crates",
                            "Curated and annotated 1,000+ training images across diverse lighting conditions (natural daylight, artificial barn lighting, IR night vision) using CVAT with strict inter-annotator agreement protocols",
                            "Trained models on MSU's High Performance Computing Cluster (HPCC) using SLURM job scheduling, experimenting with YOLOv8n/s/m variants and hyperparameter optimization (learning rate, augmentation, mosaic)",
                            "Achieved 87% mAP@0.5 on held-out test set with inference speed of 45 FPS on edge deployment hardware (NVIDIA Jetson), enabling real-time posture monitoring",
                            "Implemented data augmentation pipeline including random rotation, brightness jitter, horizontal flip, and mosaic augmentation to improve model robustness",
                            "Deployed production inference pipeline to operational swine farm cameras, implementing automatic alert system for prolonged lateral lying events indicating potential crushing risk",
                            "Identified domain shift limitations during cross-farm deployment due to camera angle and lighting variations, informing future multi-site training data collection strategy"
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
                            "Developing autonomous implement control system enabling precision depth and position adjustment for tillage equipment based on RTK-GNSS guidance data and prescription maps",
                            "Implementing ROS2-based control architecture with modular nodes for sensor input, state estimation, motion planning, and actuator output following agricultural machinery safety standards",
                            "Designing sensor integration combining RTK positioning, wheel angle feedback, and hydraulic pressure sensing for closed-loop implement control",
                            "Building operator interface displaying real-time implement status, field coverage mapping, and manual override controls"
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
            title: "Road-Rater – SpartaHack 11 (2x Award Winner)",
            location: "",
            date: "January 2026",
            bullets: {
                compact: [
                    "Developed 36-hour hackathon dashcam safety scoring system using YOLOP neural network for lane detection, drivable area segmentation, and object detection",
                    "Built full-stack web app with React/TypeScript frontend and Node.js backend; implemented video processing pipeline with OpenCV and PyTorch inference",
                    "Won Best Beginner Hack and Auto-Owners Insurance Vehicle Safety Award recognizing practical insurance industry applications"
                ],
                all: [
                    "Developed 36-hour hackathon project creating dashcam-based driving safety scoring system using YOLOP neural network for simultaneous lane detection, drivable area segmentation, and object detection",
                    "Implemented lane departure scoring algorithm calculating lateral position within lane boundaries, deviation frequency, and lane change smoothness metrics from frame-by-frame lane line polynomial fitting",
                    "Built full-stack web application with React/TypeScript frontend featuring video upload, real-time processing visualization, and interactive safety score dashboard with per-segment breakdown",
                    "Developed Node.js/Express backend with Python subprocess integration for OpenCV video processing and PyTorch YOLOP inference at 15 FPS on CPU",
                    "Won Best Beginner Hack (team's first hackathon) and Auto-Owners Insurance Vehicle Safety Award recognizing practical insurance industry applications"
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
            title: "Autonomous Agricultural Robot – PARC Competition",
            location: "East Lansing, Michigan",
            date: "2025 - Present",
            bullets: {
                compact: [
                    "Contributing to MSU's PARC entry developing autonomous ground robot for crop scouting, weed detection, and targeted intervention",
                    "Implementing ROS2 Humble navigation stack with Nav2 path planning and Velodyne VLP-16 LiDAR for SLAM-based localization in GPS-denied environments",
                    "Developing custom perception pipeline with Intel RealSense stereo camera and DeepLabv3+ for crop row detection and weed classification"
                ],
                all: [
                    "Contributing to MSU's entry in the Purdue Agricultural Robotics Challenge (PARC), developing autonomous ground robot for precision agriculture tasks including crop scouting, weed detection, and targeted intervention",
                    "Implementing ROS2 Humble-based navigation stack with Nav2 for path planning, integrating Velodyne VLP-16 LiDAR for obstacle detection and SLAM-based localization in GPS-denied crop canopy environments",
                    "Developing custom perception pipeline combining Intel RealSense D435 stereo camera with semantic segmentation (DeepLabv3+) for crop row detection and weed species classification",
                    "Building sensor fusion architecture using robot_localization package to combine wheel odometry, IMU, RTK-GPS, and visual odometry for robust state estimation",
                    "Designing modular software architecture enabling rapid integration of new sensors and task-specific manipulation payloads"
                ],
                robotics: [
                    "Contributing to MSU's entry in the Purdue Agricultural Robotics Challenge (PARC), developing autonomous ground robot for precision agriculture tasks including crop scouting, weed detection, and targeted intervention",
                    "Implementing ROS2 Humble-based navigation stack with Nav2 for global/local path planning, DWB controller for trajectory following, and behavior trees for high-level task sequencing",
                    "Integrating Velodyne VLP-16 LiDAR for 3D obstacle detection and pointcloud-based SLAM (KISS-ICP) providing localization in GPS-denied crop canopy environments with 5 cm accuracy",
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
                    "Developing simulation environment in Gazebo Ignition with custom agricultural terrain meshes, crop row models, and sensor plugins for LiDAR/camera emulation",
                    "Creating parameter management system using YAML configuration files with runtime-adjustable parameters exposed via ROS2 dynamic_reconfigure",
                    "Contributing to team codebase using Git workflows including feature branches, code review requirements, and semantic versioning for releases",
                    "Documenting API interfaces and system architecture using Sphinx/Doxygen for maintainability and knowledge transfer"
                ],
                mechatronics: [
                    "Designing sensor mounting solutions for Velodyne LiDAR (vibration-isolated mast mount) and stereo camera (adjustable tilt bracket) ensuring stable data collection on uneven terrain",
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
