const projectsData = {
    'autosteer-tractor': {
        title: 'Autosteer Tractor System',
        subtitle: 'Autonomous GPS-guided steering for precision agriculture',
        description: 'An autonomous steering system for agricultural tractors using GPS and sensor fusion to enable precise navigation and field operations.',
        image: 'Images/autosteer_Tractor.gif',
        tags: ['Arduino', 'GPS', 'C#', 'Mechatronics'],
        skills: {
            mechanical: [
                'CAD Design (SolidWorks)',
                'Hydraulic Systems',
                'Sensor Integration',
                '3D Printing & Prototyping'
            ],
            hardware: [
                'Arduino',
                'GPS Systems',
                'Circuit Design & PCB Layout',
                'Sensor Integration'
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
                'Camera Mounting Systems',
                'Environmental Enclosures'
            ],
            hardware: [
                'Camera Systems',
                'Thermal Imaging Sensors',
                'IoT Development'
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
                'CAD Design (SolidWorks, Fusion 360)',
                'Mechanical System Design',
                '3D Printing & Prototyping',
                'Manufacturing Processes'
            ],
            hardware: [
                'GPS Systems',
                'Sensor Integration',
                'Arduino & Microcontrollers',
                'Circuit Design & PCB Layout'
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
        mechanical: new Set(),
        hardware: new Set(),
        software: new Map() // Use Map to store {name: icon} pairs
    };

    Object.values(projectsData).forEach(project => {
        // Add mechanical skills
        project.skills.mechanical?.forEach(skill => allSkills.mechanical.add(skill));
        
        // Add hardware skills
        project.skills.hardware?.forEach(skill => allSkills.hardware.add(skill));
        
        // Add software skills with icons
        project.skills.software?.forEach(skill => {
            if (!allSkills.software.has(skill.name)) {
                allSkills.software.set(skill.name, skill.icon);
            }
        });
    });

    return {
        mechanical: Array.from(allSkills.mechanical).sort(),
        hardware: Array.from(allSkills.hardware).sort(),
        software: Array.from(allSkills.software, ([name, icon]) => ({ name, icon }))
    };
}

// Function to get project data by ID
function getProjectData(projectId) {
    return projectsData[projectId] || null;
}
