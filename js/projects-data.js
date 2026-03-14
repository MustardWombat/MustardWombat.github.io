const projectsData = {
    'autosteer-tractor': {
        title: 'Autosteer Tractor System',
        subtitle: 'Autonomous GPS-guided steering for precision agriculture',
        description: 'An autonomous steering system for agricultural tractors using RTK-GPS, IMU, and wheel angle sensing to enable precise navigation and field operations with centimeter-level accuracy.',
        image: 'Images/autosteer_Tractor.gif',
        tags: ['Arduino', 'GPS', 'C#', 'Mechatronics'],
        focusAreas: ['robotics', 'mechatronics'],
        resumeBullets: [
            'Autonomous steering system: ±2cm accuracy (RTK-GPS, IMU, wheel angle sensors, Arduino, PID control)',
            'Robotics integration: real-time navigation, closed-loop control',
            'C# interface for path planning and field operations'
        ],
        skills: {
            hardware: [
                { name: 'RTK-GPS', icon: null },
                { name: 'IMU', icon: null },
                { name: 'Wheel Angle Sensor', icon: null },
                { name: 'Hydraulic Valve', icon: null }
            ],
            software: [
                { name: 'C#', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' },
                { name: 'Arduino', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg' },
                { name: 'AgOpenGPS', icon: null },
                { name: 'pandas', icon: null },
                { name: 'matplotlib', icon: null },
                { name: 'NumPy', icon: null },
                { name: 'Robotics', icon: null },
                { name: 'Controls', icon: null }
            ]
        }
    },
    'piglet-vision': {
        title: 'Piglet Keypoint Detection System',
        subtitle: 'MMPose-based model for anatomical keypoint detection in piglets',
        description: 'Developed a machine learning pipeline for 7-keypoint pose estimation of piglets using the OpenMMLab MMPose framework on the MSU High Performance Computing Cluster (HPCC). Built automated workflows for dataset transfer, model training, and pose visualization for livestock behavior analysis.',
        image: 'Images/Pigs.gif',
        tags: ['Computer Vision', 'Python', 'MMPose', 'PyTorch', 'OpenMMLab', 'Deep Learning', 'Conda', 'SLURM', 'HPC'],
        focusAreas: ['computer-vision', 'software'],
        keywords: ['keypoint detection', 'pose estimation', 'Roboflow', 'COCO format', 'HPCC', 'GPU training', 'data augmentation', 'optical flow', 'custom dataset', 'training pipeline', 'model validation', 'SLURM', 'conda environment', 'OpenMMLab', 'PyTorch', 'MMPose', 'MMEngine', 'MMCV', 'HPC', 'CUDA', 'animal behavior analysis'],
        resumeBullets: [
            'Developed HPC-based ML pipeline using PyTorch and OpenMMLab MMPose to train 7-keypoint piglet pose estimation model',
            'Built scripts to automate dataset transfer from Roboflow, convert to COCO format, and organize for model training',
            'Implemented SLURM-based GPU training workflows on MSU HPCC with Conda environment management',
            'Created visualization tools for pose predictions with confidence-based color coding for keypoint overlay',
            'Annotated 1,100+ piglet images; applied data augmentation for lighting and pose diversity',
            'Automated environment setup and dependency installation for reproducible MMPose/OpenMMLab deployments'
        ],
        skills: {
            hardware: [
                { name: 'HPC/GPU Computing', icon: null },
                { name: 'CUDA', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'MMPose', icon: null },
                { name: 'PyTorch', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg' },
                { name: 'OpenMMLab', icon: null },
                { name: 'MMEngine', icon: null },
                { name: 'MMCV', icon: null },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'SLURM', icon: null },
                { name: 'Conda', icon: null },
                { name: 'Bash', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg' },
                { name: 'Git', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
                { name: 'Roboflow API', icon: null },
                { name: 'NumPy', icon: null },
                { name: 'matplotlib', icon: null }
            ]
        }
    },
    'agri-robotics-club': {
        title: "ASABE Agricultural Robotics Challenge Robot '26",
        subtitle: 'Ground robot for precision farming and crop monitoring',
        description: 'Development of an autonomous ground robot designed for precision agriculture tasks including crop monitoring, weed detection, and targeted intervention in agricultural fields for the ASABE Agricultural Robotics Challenge.',
        image: 'Images/PARC.jpg',
        tags: ['Robotics', 'ROS', 'Autonomous Navigation', 'Computer Vision'],
        focusAreas: ['robotics', 'computer-vision', 'software'],
        resumeBullets: [
            'Autonomous ground robot for ASABE Robotics Challenge',
            'Robotics integration: ROS navigation, sensor fusion, hardware controls',
            'Computer vision for crop monitoring and weed detection'
        ],
        // location property removed
        skills: {
            hardware: [
                { name: 'Motor Controllers', icon: null },
                { name: 'Sensors', icon: null },
                { name: 'Robotics', icon: null },
                { name: 'Controls', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'C++', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
                { name: 'ROS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'MMPose', icon: null },
                { name: 'Git', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
                { name: 'NumPy', icon: null },
                { name: 'matplotlib', icon: null },
                { name: 'pandas', icon: null },
                { name: 'Robotics', icon: null },
                { name: 'Controls', icon: null }
            ]
        }
    },
    'street-lateral-position': {
        title: 'Street Lateral Position Visual System (Best Beginner Hack & Auto-Owners Insurance Vehicle Safety Award, SpartaHack 11)',
        subtitle: 'Computer vision system for real-time street lane detection and vehicle positioning',
        description: 'Coming soon: A computer vision project utilizing advanced image processing and machine learning algorithms to detect street lanes, analyze vehicle lateral position, and provide visual feedback for autonomous driving applications. This system will integrate with existing navigation systems to enhance road safety and autonomous vehicle capabilities.',
        image: 'Images/coming-soon.jpg',
        tags: ['Computer Vision', 'Python', 'OpenCV', 'Machine Learning'],
        focusAreas: ['computer-vision', 'software'],
        comingSoon: true,
        resumeBullets: [],
        skills: {
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'TensorFlow', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg' },
                { name: 'NumPy', icon: null },
                { name: 'matplotlib', icon: null },
                { name: 'pandas', icon: null }
            ]
        }
    },
    'autonomous-farming-tool': {
        title: 'Auto-Steering Cultivator',
        subtitle: 'Feedback-loop driven autonomous cultivator for precision agriculture',
        description: 'A feedback-loop driven autonomous cultivator system for precision agriculture, including soil sampling, planting, and targeted crop treatment. Closed-loop control enables robust center line following and real-time correction. Frame extraction, dataset improvement, and PID servo control are integrated for optimal performance.',
        image: 'Images/tooling.jpg',
        tags: ['Robotics', 'Cultivator', 'Precision Agriculture', 'AI', 'Feedback Loop'],
        focusAreas: ['robotics', 'mechatronics'],
        comingSoon: true,
        resumeBullets: [
            "Integrated a full-stack autonomous steering system for an agricultural cultivator using Jetson Nano, stereo camera vision, Python, ROS2 nodes, and a servo motor for actuation.",
            "Developed a vision-based lane guidance pipeline: stereo camera and Jetson Nano for real-time image processing, ROS2 nodes for control logic, and servo motor for precise steering.",
            "Implemented system-level integration of perception (vision-based XTE calculation), control (PID loop), and actuation (PWM to servo) for robust center line following.",
            "Coordinated hardware and software interfaces across power, compute, sensing, and mechanical subsystems to deliver a cohesive autonomous platform."
        ],
        skills: {
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'ROS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
                { name: 'Computer Vision', icon: null },
                { name: 'Machine Learning', icon: null },
                { name: 'Qt', icon: null },
                { name: 'PySide', icon: null },
                { name: 'plotjuggler', icon: null },
                { name: 'NumPy', icon: null },
                { name: 'matplotlib', icon: null },
                { name: 'pandas', icon: null }
            ]
        }
    }
};

// Function to get all unique skills across all projects
function getAllSkills() {
    const allSkills = {
        mechanical: new Map(),
        hardware: new Map(),
        software: new Map()
    };

    Object.values(projectsData).forEach(project => {
        // Add mechanical skills with icons
        project.skills.mechanical?.forEach(skill => {
            if (!allSkills.mechanical.has(skill.name)) {
                allSkills.mechanical.set(skill.name, skill.icon);
            }
        });
        
        // Add hardware skills with icons
        project.skills.hardware?.forEach(skill => {
            if (!allSkills.hardware.has(skill.name)) {
                allSkills.hardware.set(skill.name, skill.icon);
            }
        });
        
        // Add software skills with icons
        project.skills.software?.forEach(skill => {
            if (!allSkills.software.has(skill.name)) {
                allSkills.software.set(skill.name, skill.icon);
            }
        });
    });

    return {
        mechanical: Array.from(allSkills.mechanical, ([name, icon]) => ({ name, icon })),
        hardware: Array.from(allSkills.hardware, ([name, icon]) => ({ name, icon })),
        software: Array.from(allSkills.software, ([name, icon]) => ({ name, icon }))
    };
}

// Function to get project data by ID
function getProjectData(projectId) {
    return projectsData[projectId] || null;
}
