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
            mechanical: [
                { name: 'Fusion 360', icon: null }
            ],
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
                { name: 'NumPy', icon: null }
            ],
            robotics: [
                { name: 'PID Control', icon: null },
                { name: 'Closed-Loop Control', icon: null },
                { name: 'Autonomous Navigation', icon: null },
                { name: 'Hydraulic Actuation', icon: null }
            ]
        }
    },
    'piglet-vision': {
        title: 'Piglet Keypoint Detection System',
        subtitle: 'MMPose-based model for anatomical keypoint detection in piglets',
        description: 'Developed a machine learning pipeline for 7-keypoint pose estimation of piglets using the OpenMMLab MMPose framework on the MSU High Performance Computing Cluster (HPCC). Built automated workflows for dataset transfer, model training, and pose visualization for livestock behavior analysis.',
        image: 'Images/piglet.gif',
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
                { name: 'Sensors', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'C++', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'MMPose', icon: null },
                { name: 'Git', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' },
                { name: 'NumPy', icon: null },
                { name: 'matplotlib', icon: null },
                { name: 'pandas', icon: null }
            ],
            robotics: [
                { name: 'ROS2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
                { name: 'Autonomous Navigation', icon: null },
                { name: 'Sensor Fusion', icon: null },
                { name: 'Path Planning', icon: null }
            ]
        }
    },
    'autonomous-farming-tool': {
        title: 'Auto-Steering Cultivator',
        subtitle: '',
        description: '',
        image: 'Images/Cultivator.jpg',
        tags: ['Robotics', 'Cultivator', 'Precision Agriculture'],
        focusAreas: ['robotics', 'mechatronics'],
        comingSoon: true,
        resumeBullets: [],

        skills: {
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'Computer Vision', icon: null },
                { name: 'Machine Learning', icon: null },
                { name: 'Qt', icon: null },
                { name: 'PySide', icon: null },
                { name: 'plotjuggler', icon: null },
                { name: 'NumPy', icon: null },
                { name: 'matplotlib', icon: null },
                { name: 'pandas', icon: null }
            ],
            robotics: [
                { name: 'ROS2', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
                { name: 'Row Following', icon: null },
                { name: 'Autonomous Navigation', icon: null },
                { name: 'Sensor Fusion', icon: null }
            ]
        }
    }
};

// Function to get all unique skills across all projects
function getAllSkills() {
    const allSkills = {
        mechanical: new Map(),
        hardware: new Map(),
        software: new Map(),
        robotics: new Map()
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

        // Add robotics skills with icons
        project.skills.robotics?.forEach(skill => {
            if (!allSkills.robotics.has(skill.name)) {
                allSkills.robotics.set(skill.name, skill.icon);
            }
        });
    });

    return {
        mechanical: Array.from(allSkills.mechanical, ([name, icon]) => ({ name, icon })),
        hardware: Array.from(allSkills.hardware, ([name, icon]) => ({ name, icon })),
        software: Array.from(allSkills.software, ([name, icon]) => ({ name, icon })),
        robotics: Array.from(allSkills.robotics, ([name, icon]) => ({ name, icon }))
    };
}

// Function to get project data by ID
function getProjectData(projectId) {
    return projectsData[projectId] || null;
}
