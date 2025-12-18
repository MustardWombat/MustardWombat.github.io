const projectsData = {
    'autosteer-tractor': {
        title: 'Autosteer Tractor System',
        subtitle: 'Autonomous GPS-guided steering for precision agriculture',
        description: 'An autonomous steering system for agricultural tractors using GPS and sensor fusion to enable precise navigation and field operations.',
        image: 'Images/autosteer_Tractor.gif',
        tags: ['Arduino', 'GPS', 'C#', 'Mechatronics'],
        skills: {
            mechanical: [
                { name: 'CAD Design (SolidWorks)', icon: 'https://upload.wikimedia.org/wikipedia/en/d/d2/SolidWorks_Logo.svg' },
                { name: 'Hydraulic Systems', icon: null },
                { name: 'Sensor Integration', icon: null },
                { name: '3D Printing & Prototyping', icon: null }
            ],
            hardware: [
                { name: 'Arduino', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg' },
                { name: 'GPS Systems', icon: null },
                { name: 'Circuit Design & PCB Layout', icon: null },
                { name: 'Sensor Integration', icon: null }
            ],
            software: [
                { name: 'C#', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg' },
                { name: 'Arduino', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg' },
                { name: 'AgOpenGPS', icon: null }
            ]
        }
    },
    'piglet-vision': {
        title: 'Pig Posture Detection System',
        subtitle: 'YOLOv11-based model for automated pig behavior analysis',
        description: 'A computer vision system using YOLOv11 to detect and classify pig postures, enabling automated monitoring of pig behavior and health status in farming operations.',
        image: 'Images/Pigs.gif',
        tags: ['Computer Vision', 'Python', 'YOLOv11', 'Deep Learning'],
        skills: {
            mechanical: [
                { name: 'Camera Mounting Systems', icon: null },
                { name: 'Environmental Enclosures', icon: null }
            ],
            hardware: [
                { name: 'Camera Systems', icon: null },
                { name: 'Edge Computing Devices', icon: null },
                { name: 'IoT Development', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'YOLOv11', icon: 'https://raw.githubusercontent.com/ultralytics/assets/main/logo/Ultralytics_Logotype_Original.svg' },
                { name: 'PyTorch', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' }
            ]
        }
    },
    'agri-robotics-club': {
        title: 'Autonomous Agricultural Robot',
        subtitle: 'Ground robot for precision farming and crop monitoring',
        description: 'Development of an autonomous ground robot designed for precision agriculture tasks including crop monitoring, weed detection, and targeted intervention in agricultural fields.',
        image: 'Images/PARC.jpg',
        tags: ['Robotics', 'ROS', 'Autonomous Navigation', 'Computer Vision'],
        skills: {
            mechanical: [
                { name: 'CAD Design (SolidWorks, Fusion 360)', icon: 'https://upload.wikimedia.org/wikipedia/en/d/d2/SolidWorks_Logo.svg' },
                { name: 'Mechanical System Design', icon: null },
                { name: '3D Printing & Prototyping', icon: null },
                { name: 'Manufacturing Processes', icon: null }
            ],
            hardware: [
                { name: 'GPS Systems', icon: null },
                { name: 'LiDAR & Camera Systems', icon: null },
                { name: 'Motor Controllers', icon: null },
                { name: 'Sensor Integration', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'C++', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
                { name: 'ROS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'Git', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg' }
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
