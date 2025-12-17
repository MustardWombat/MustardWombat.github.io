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
        title: 'Piglet Mortality Reduction Vision System',
        subtitle: 'AI-powered monitoring for early detection of piglet distress',
        description: 'A computer vision system designed to monitor piglet behavior and detect early signs of distress, helping farmers prevent mortality through real-time alerts and tracking.',
        image: 'Images/Pigs.gif',
        tags: ['Computer Vision', 'Python', 'Machine Learning', 'IoT'],
        skills: {
            mechanical: [
                { name: 'Camera Mounting Systems', icon: null },
                { name: 'Environmental Enclosures', icon: null }
            ],
            hardware: [
                { name: 'Camera Systems', icon: null },
                { name: 'Thermal Imaging Sensors', icon: null },
                { name: 'IoT Development', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'YOLOv8', icon: 'https://raw.githubusercontent.com/ultralytics/assets/main/logo/Ultralytics_Logotype_Original.svg' },
                { name: 'TensorFlow', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg' },
                { name: 'PyTorch', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg' }
            ]
        }
    },
    'agri-robotics-club': {
        title: 'Precision Agricultural Robotics Club',
        subtitle: 'Autonomous robot for precision farming tasks',
        description: 'Contributing to the development of an autonomous robot for precision farming applications, focusing on sustainable agriculture and innovative field automation solutions.',
        image: 'Images/PARC.jpg',
        tags: ['Robotics', 'ROS', 'Python', 'Autonomous Navigation'],
        skills: {
            mechanical: [
                { name: 'CAD Design (SolidWorks, Fusion 360)', icon: 'https://upload.wikimedia.org/wikipedia/en/d/d2/SolidWorks_Logo.svg' },
                { name: 'Mechanical System Design', icon: null },
                { name: '3D Printing & Prototyping', icon: null },
                { name: 'Manufacturing Processes', icon: null }
            ],
            hardware: [
                { name: 'GPS Systems', icon: null },
                { name: 'Sensor Integration', icon: null },
                { name: 'Arduino & Microcontrollers', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg' },
                { name: 'Circuit Design & PCB Layout', icon: null }
            ],
            software: [
                { name: 'Python', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg' },
                { name: 'C++', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg' },
                { name: 'OpenCV', icon: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/opencv/opencv-original.svg' },
                { name: 'ROS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ros/ros-original.svg' },
                { name: 'YOLOv8', icon: 'https://raw.githubusercontent.com/ultralytics/assets/main/logo/Ultralytics_Logotype_Original.svg' },
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
