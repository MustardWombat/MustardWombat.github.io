// Hand-written tailored resume presets — no live API, no per-visitor key.
// James adds/updates an entry here whenever he's targeting a specific role;
// the "Tailored For" dropdown on resume.html reads its options from this file.
//
// Every bullet must be copied or reworded from the source content already in
// js/resume-data.js — never invent a fact, tool, or metric that isn't already
// there. Shape consumed by applyPreset() in js/resume-generator.js:
//
// const resumePresets = {
//     'some-role-slug': {
//         label: 'Robotics Software Engineer @ Company',   // shown in the dropdown + PDF filename + banner
//         subtitle: 'A 1-line tailored headline',
//         skillsSummary: 'Comma-separated skills, most relevant first',
//         experience: [
//             {
//                 role: 'Undergraduate Research Assistant – Michigan State University', // must match "title – organization" in resumeData.experience
//                 projects: [
//                     {
//                         title: 'Autosteer Tractor Guidance System', // must match a researchProjects title
//                         primaryBullets: ['...', '...'],
//                         additionalBullets: ['...']
//                     }
//                 ]
//             }
//         ],
//         projects: [
//             {
//                 title: 'Road-Rater – ...', // must match a resumeData.projects title
//                 date: 'January 2026',
//                 primaryBullets: ['...'],
//                 additionalBullets: ['...']
//             }
//         ]
//     }
// };

const resumePresets = {
    'ag-engineering': {
        label: 'Agricultural Engineering / Precision Ag',
        subtitle: 'Agricultural Engineering | Precision Agriculture & Autonomous Farm Systems',
        skillsSummary: 'RTK-GPS, IMU, Wheel Angle Sensor, Hydraulic Valve, CAN Bus (CANopen/DS402, J1939), Hall-Effect Angle Sensor, PID control, Sensor fusion, Computer vision (MMPose, OpenCV), pose estimation, deep learning, PyTorch, Python (PyTorch, OpenMMLab, MMPose), C++, C#, NVIDIA Jetson (Orin Nano), Motor Controllers, PoE, Fusion 360, pandas, NumPy, matplotlib, Git, Docker, SLURM, ROS2, MQTT',
        experience: [
            {
                role: 'Undergraduate Research Assistant – Michigan State University',
                projects: [
                    {
                        title: 'Autosteer Tractor Guidance System',
                        primaryBullets: [
                            'Developed and validated autonomous tractor guidance achieving ±2 cm cross-track accuracy using dual-frequency RTK-GNSS (u-blox F9P) with NTRIP corrections from a radio-linked base station, integrated with proportional hydraulic steering valve control',
                            'Designed electrical system architecture connecting RTK-GNSS receiver, IMU, wheel angle sensor (WAS), and steering controller via RS232/USB interfaces with proper grounding and EMI shielding',
                            'Validated control system performance through 50+ hours of field operation across varying soil conditions, speeds (2-8 mph), and implement configurations'
                        ],
                        additionalBullets: [
                            'Diagnosed and resolved RTK correction dropouts by transitioning from cellular NTRIP to 900 MHz radio link with dedicated base station, achieving 99.5%+ RTK fix availability',
                            'Performed quantitative accuracy analysis using Python (pandas, matplotlib) to generate XTE histograms, trajectory overlay plots, and statistical summaries demonstrating sub-inch guidance precision across multiple field trials',
                            'Integrated proportional hydraulic steering valve with PWM control signal from Arduino-based steering controller, calibrating valve response curves for smooth steering actuation'
                        ]
                    },
                    {
                        title: 'Auto-Steering Cultivator Development',
                        primaryBullets: [
                            'Designed a CAN-bus-based autonomous steering retrofit for a Tilmor steerable cultivator, targeting 1-2cm intra-row accuracy to reduce crop damage during mechanical weeding',
                            'Architected dual isolated CAN bus control system (CANopen/DS402, J1939) on a Jetson Orin Nano, with closed-loop PID steering control from an external Hall-effect angle sensor',
                            'Designed and fabricated motor mounts, structural brackets, and shaft collar assemblies in Fusion 360, validating torque-reacting brackets under cyclic/reversing loads'
                        ],
                        additionalBullets: [
                            'Implemented a layered, defense-in-depth safety architecture combining software soft limits, mechanical hard stops, driver-level overcurrent protection, and emergency stop systems',
                            'Characterized DC motor behavior (back-EMF, stall current, torque-speed) and configured motor driver protection using programmable DC power supply bench testing',
                            'Built a ROS2/Gazebo simulation environment mirroring the physical CAN architecture, using SocketCAN for hardware-in-the-loop-style validation before field deployment'
                        ]
                    },
                    {
                        title: 'Piglet Keypoint Detection System (MMPose, PyTorch, HPCC)',
                        primaryBullets: [
                            'Led development of piglet keypoint detection system: Roboflow API integration, COCO format conversion, PyTorch/MMPose training, HPCC/SLURM automation, and visualization tools for livestock behavior analysis.',
                            'Integrated computer vision inference pipeline with farm monitoring infrastructure for autonomous real-time behavioral alerts'
                        ],
                        additionalBullets: [
                            'Deployed edge computing solution on NVIDIA Jetson for low-latency inference and farm integration',
                            'Designed camera mounting and edge hardware solutions for barn deployment, including PoE and thermal management for high-humidity environments'
                        ]
                    }
                ]
            }
        ],
        projects: [
            {
                title: 'ASABE Agricultural Robotics Challenge Robot',
                date: '2025 - Present',
                primaryBullets: [
                    'Contributing to MSU\'s entry in the ASABE Agricultural Robotics Challenge, developing autonomous ground robot for precision agriculture tasks including crop scouting, weed detection, and targeted intervention',
                    'Building sensor fusion architecture using robot_localization EKF node to combine wheel odometry (100 Hz), IMU (200 Hz), RTK-GPS (10 Hz), and visual odometry for robust 6-DOF state estimation'
                ],
                additionalBullets: [
                    'Implementing semantic segmentation using DeepLabv3+ with ResNet-50 backbone, trained on custom agricultural dataset with classes for crop, weed, soil, and residue',
                    'Designing weatherproof electronics enclosure with IP65 rating, thermal management (cooling fans, heat sinks), and cable strain relief for field operation in dusty, humid conditions'
                ]
            }
        ]
    }
};
