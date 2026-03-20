import networkx as nx
import matplotlib.pyplot as plt

class Node:
    def __init__(self, name, identity, building, description = '', number = '', _type = ''):
        self.building = building
        self.number = number
        self.name = name
        self.identity = identity
        self.desc = description
        self.type = _type 
        self.connection = []

    def get_name(self):
        lower = self.identity.casefold()
        if lower == 'stairs':
            return self.building + ' ' + self.name + ' ' + self.identity + ' ' + self.number
        elif lower == 'elevator' or lower == 'fire exit':
            return self.building + ' ' + self.name + ' ' + self.identity
        elif self.name != '' and self.identity == '' and self.number == '':
            return self.building + ' ' + self.name
        elif lower == 'office' and self.number == '':
            return self.building + ' ' + self.name
        elif lower == 'room' and len(self.number) == 3 and self.name == '':
            return self.building + ' ' + self.number + ' Room'
        elif lower == 'room' and self.number == '' and self.name != '':
            return self.building + ' ' + self.name + ' ' + self.identity
        elif lower == 'room' and len(self.number) == 3 and self.name != '':
            return self.building + ' ' + self.number + ' - ' + self.name
        elif lower == 'room' and len(self.number) == 3:
            return self.building + ' ' + self.number + ' - ' + self.name
        elif lower == 'passage':
            return self.building + ' to ' + self.name + ' ' + self.identity
        elif lower == 'storage' and self.number != '':
            return self.building + ' ' + self.number + ' - ' + self.name
        elif lower == 'storage' and self.number == '':
            return self.building + ' ' + self.name
        elif lower == 'vacant':
            return self.building + ' ' + self.identity + ' Room'
        elif lower == 'exit':
            return self.building + ' ' + self.name
        elif lower in ['cashier', 'canteen', 'tambayanan', 'path', 'lounge']:
            return self.building + ' ' + self.identity
        else:
            return self.building + ' ' + self.number + ' - ' + self.name
         
    def __hash__(self):
        return hash(self.name) 

    def __repr__(self):
        return f"{self.type}: {self.name}"

class Map():
    def __init__(self):
        # NEW FIELD, ROAD, & LOBBY
        lobby_passage = [
            Node(building='Lobby', number='', name='Canteen', identity='Passage'),
            Node(building='Lobby', number='', name='Pavement', identity='Passage'),
            Node(building='Lobby', number='', name='AGM', identity='Passage'),
        ]
        lobby = [
            Node(building='Lobby', number='', name='Tables & Chairs', identity='Lounge'),
            Node(building='Lobby', number='', name='Faculty Room', identity='Office'),
        ]
        field = [
            Node(building='Pavement', number='', name='Pavement', identity='Path'),
        ]
        road = [
            Node(building='Road', number='', name='Vehicle Road', identity='Path'),
        ]
        place = [lobby_passage, lobby, field, road]

        # NEW EMM
        emm_floor_1 = [
            Node(building='EMM', number='1', name='1st Floor', identity='Stairs'),
            Node(building='EMM', number='2', name='1st Floor', identity='Stairs'),

            Node(building='EMM', number='101', name='Computer Lab A', identity='Laboratory'),
            Node(building='EMM', number='102', name='Computer Lab B', identity='Laboratory'),
            Node(building='EMM', number='105', name='Computer Lab C', identity='Laboratory'),
            Node(building='EMM', number='103', name='MIS', identity='Office'),
            Node(building='EMM', number='104', name='ITE Department', identity='Office'),
            Node(building='EMM', number='108', name='Infirmary', identity='Clinic'),
            Node(building='EMM', number='', name='Storage Room', identity='Storage'),
            Node(building='EMM', number='1st Floor', name='CR Women', identity='Comfort Room'),
        ]

        emm_floor_2 = [
            Node(building='EMM', number='1', name='2nd Floor', identity='Stairs'),
            Node(building='EMM', number='2', name='2nd Floor', identity='Stairs'),

            Node(building='EMM', number='201', name='', identity='Room'),
            Node(building='EMM', number='202', name='BSCrim Office', identity='Office'),
            Node(building='EMM', number='', name='IT Clinic', identity='Office'),
            Node(building='EMM', number='203', name='Marketing and Office Promotion', identity='office'),
            Node(building='EMM', number='204', name='Student Service Offices & Supreme Student Council', identity='Office'),
            Node(building='EMM', number='205', name='Admission Office', identity='Office'),
            Node(building='EMM', number='206', name='TVET Office', identity='Office'),
            Node(building='EMM', number='207', name='Alumni Office', identity='Office'),
            Node(building='EMM', number='208', name='BECED Simulation Room', identity='Room'),
            Node(building='EMM', number='2nd Floor', name='CR Men & Women', identity='Comfort Room'),
        ]

        emm_floor_3 = [
            Node(building='EMM', number='1', name='3rd Floor', identity='Stairs'),
            Node(building='EMM', number='2', name='3rd Floor', identity='Stairs'),

            Node(building='EMM', number='301', name='', identity='Room'),
            Node(building='EMM', number='302', name='', identity='Room'),
            Node(building='EMM', number='303', name='', identity='Room'),
            Node(building='EMM', number='304', name='', identity='Room'),
            Node(building='EMM', number='305', name='TEP Coordinators Office', identity='Office'),
            Node(building='EMM', number='306', name='Secondary Education Simulation Room', identity='Room'),
            Node(building='EMM', number='307', name='Elementary Education Simulation Room', identity='Room'),
            Node(building='EMM', number='308', name='Teacher Education Program', identity='Office'),
            Node(building='EMM', number='3rd Floor', name='CR Men & Women', identity='Comfort Room'),
        ]

        emm_floor_4 = [
            Node(building='EMM', number='1', name='4th Floor', identity='Stairs'),
            Node(building='EMM', number='2', name='4th Floor', identity='Stairs'),

            Node(building='EMM', number='401', name='CAS Laboratory', identity='Laboratory'),
            Node(building='EMM', number='402', name='Physics Laboratory', identity='Laboratory'),
            Node(building='EMM', number='403', name='Science Lab Control Office', identity='Office'),
            Node(building='EMM', number='', name='', identity='Vacant'),
            Node(building='EMM', number='404', name='Chemistry Laboratory', identity='Laboratory'),
            Node(building='EMM', number='405', name='', identity='Room'),
            Node(building='EMM', number='406', name='International Linkages Office', identity='Office'),
            Node(building='EMM', number='', name='BLIS Office', identity='Office'),
            Node(building='EMM', number='', name='Theatre', identity=''),
        ]

        emm_passage = [
            Node(building='EMM', number='', name='Lobby', identity='Passage'),
            Node(building='EMM', number='', name='Pavement', identity='Passage'),
            Node(building='EMM', number='', name='ERM', identity='Passage'),
        ]
        emm = [emm_passage, emm_floor_1, emm_floor_2, emm_floor_3, emm_floor_4]

        # NEW ERM
        erm_floor_1 = [
            Node(building='ERM', number='', name='1st', identity='Stairs'),

            Node(building='ERM', number='101', name='Graduate School Program', identity='Room'),
            Node(building='ERM', number='102', name='Graduate School Library', identity='Library'),
        ]

        erm_floor_2 = [
            Node(building='ERM', number='', name='2nd', identity='Stairs'),

            Node(building='ERM', number='201', name='Foreign Books Library', identity='Library'),
        ]

        erm_floor_3 = [
            Node(building='ERM', number='', name='3rd', identity='Stairs'),

            Node(building='ERM', number='301', name='Filipino Author Library', identity='Library'),
        ]

        erm_floor_4 = [
            Node(building='ERM', number='', name='4th', identity='Stairs'),

            Node(building='ERM', number='401', name='Theatre', identity='Theatre'),
        ]
        erm_passage = [
            Node(building='ERM', number='', name='FGM', identity='Passage'),
            Node(building='ERM', number='', name='Pavement', identity='Passage'),
            Node(building='ERM', number='', name='EMM', identity='Passage'),
        ]

        erm = [erm_passage, erm_floor_1, erm_floor_2, erm_floor_3, erm_floor_4]

        # NEW AGM
        agm_floor_1 = [
            Node(building='AGM', number='1', name='1st Floor', identity='Stairs'),
            Node(building='AGM', number='2', name='1st Floor', identity='Stairs'),

            Node(building='AGM', number='101', name='Hydraulics Laboratory', identity='Laboratory'),
            Node(building='AGM', number='102', name='Materials & Testing Laboratory', identity='Laboratory'),
            Node(building='AGM', number='103', name='CBE Office', identity='Office'),
            Node(building='AGM', number='104', name='CAS Office', identity='Office'),
            Node(building='AGM', number='105', name='Guidance Office', identity='Office'),
            Node(building='AGM', number='106', name='Counseling Office', identity='Office'),
            Node(building='AGM', number='107', name='', identity='Room'),
            Node(building='AGM', number='110', name='Bookstore & Printing Office', identity='Bookstore'),
            Node(building='AGM', number='', name='', identity='Canteen'),
            Node(building='AGM', number='', name='School Exit', identity='Exit')
        ]

        agm_floor_2 = [
            Node(building='AGM', number='1', name='2nd Floor', identity='Stairs'),
            Node(building='AGM', number='2', name='2nd Floor', identity='Stairs'),

            Node(building='AGM', number='200', name='Electrical Room', identity='Room'),
            Node(building='AGM', number='201', name='Customs Admin Simulation Room', identity='Room'),
            Node(building='AGM', number='202', name='', identity='Room'),
            Node(building='AGM', number='203', name='Criminology Internship Unit', identity='Office'),
            Node(building='AGM', number='204', name='General Education Program', identity='Office'),
            Node(building='AGM', number='205', name='Engineering Faculty', identity='Office'),
            Node(building='AGM', number='206', name='', identity='Room'),
            Node(building='AGM', number='', name='Observation', identity='Room'),
            Node(building='AGM', number='207', name='Psyche Lab', identity='Laboratory'),
            Node(building='AGM', number='208', name='', identity='Room'),
            Node(building='AGM', number='209', name='Engineering Program', identity='Office'),
            Node(building='AGM', number='210', name='', identity='Room'),
            Node(building='AGM', number='211', name='', identity='Room'),
            Node(building='AGM', number='212', name='AB English Simulation Room', identity='Room'),
            Node(building='AGM', number='213', name='Communication Hub', identity='Others'),
            Node(building='AGM', number='214', name='Mass Communication Room', identity='Room'),
            Node(building='AGM', number='216', name='ETEEAP Office', identity='Office')
        ]

        agm_passage = [
            Node(building='AGM', number='', name='Lobby', identity='Passage'),
            Node(building='AGM', number='', name='Road', identity='Passage'),
            Node(building='AGM', number='', name='School Entrance', identity='Passage'),
            Node(building='AGM', number='', name='FGM', identity='Passage'),
        ]

        agm = [agm_passage, agm_floor_1, agm_floor_2]

        # NEW FGM

        fgm_floor_1 = [
            Node(building='FGM', number='1', name='1st Floor', identity='Stairs'),
            Node(building='FGM', number='2', name='1st Floor', identity='Stairs'),
            Node(building='FGM', number='', name='1st Floor', identity='Elevator'),

            Node(building='FGM', number='101', name='Male CR', identity='Comfort Room'),
            Node(building='FGM', number='102', name='Faculty & Staff CR', identity='Comfort Room'),
            Node(building='FGM', number='103', name='PWD CR', identity='Comfort Room'),

            Node(building='FGM', number='104', name='Registrar\'s Office', identity='Office'),
            Node(building='FGM', number='105', name='Finance Office', identity='Office'),
            Node(building='FGM', number='106', name='Academic Affairs Office', identity='Office'),
            Node(building='FGM', number='107', name='Electrical Room', identity='Room'),
            Node(building='FGM', number='108', name='Conference Room', identity='Room'),
            Node(building='FGM', number='109', name='REEDO', identity='Office'),
            Node(building='FGM', number='', name='', identity='Cashier'),
            Node(building='FGM', number='', name='Admin Office', identity='Office'),
        ]

        fgm_floor_2 = [
            Node(building='FGM', number='1', name='2nd Floor', identity='Stairs'),
            Node(building='FGM', number='2', name='2nd Floor', identity='Stairs'),
            Node(building='FGM', number='', name='2nd Floor', identity='Elevator'),
            Node(building='FGM', number='', name='2nd Floor', identity='Fire Exit'),

            Node(building='FGM', number='201', name='CR Men', identity='Comfort Room'),
            Node(building='FGM', number='212', name='CR Women', identity='Comfort Room'),

            Node(building='FGM', number='202', name='Nursing Skills Lab 1', identity='Laboratory'),
            Node(building='FGM', number='203', name='Nursing Skills Lab 2', identity='Laboratory'),
            Node(building='FGM', number='204', name='COAHS Dean\'s Office', identity='Office'),
            Node(building='FGM', number='205', name='Nursing Skills Lab 3', identity='Laboratory'),
            Node(building='FGM', number='206', name='Anatomy Lab', identity='Laboratory'),
            Node(building='FGM', number='207', name='(BSHM-BSTM-BSOA-REM) Simulation Room', identity='Room'),
            Node(building='FGM', number='208', name='BSOA-BSHM-BSTM-BSREM Office', identity='Office'),
            Node(building='FGM', number='209', name='Electrical Room', identity='Room'),
            Node(building='FGM', number='210', name='Instrumentation Room & Pharma Lab Extension', identity='Laboratory'),
            Node(building='FGM', number='211', name='Nursing Skills Lab 4', identity='Laboratory'),
        ]

        fgm_floor_3 = [
            Node(building='FGM', number='1', name='3rd Floor', identity='Stairs'),
            Node(building='FGM', number='2', name='3rd Floor', identity='Stairs'),
            Node(building='FGM', number='', name='3rd Floor', identity='Elevator'),
            Node(building='FGM', number='', name='3rd Floor', identity='Fire Exit'),

            Node(building='FGM', number='301', name='CR Men', identity='Comfort Room'),
            Node(building='FGM', number='313', name='CR Women', identity='Comfort Room'),

            Node(building='FGM', number='302', name='', identity='Room'),
            Node(building='FGM', number='303', name='', identity='Room'),
            Node(building='FGM', number='305', name='Stock Room', identity='Storage'),
            Node(building='FGM', number='306', name='', identity='Room'),
            Node(building='FGM', number='307', name='', identity='Room'),
            Node(building='FGM', number='308', name='', identity='Room'),
            Node(building='FGM', number='3rd Floor', name='Electrical Room', identity='Room'),
            Node(building='FGM', number='3rd Floor', name='Counseling Room', identity='Room'),
            Node(building='FGM', number='309', name='', identity='Room'),
            Node(building='FGM', number='311', name='', identity='Room'),
            Node(building='FGM', number='312', name='', identity='Room'),
        ]

        fgm_floor_4 = [
            Node(building='FGM', number='1', name='4th Floor', identity='Stairs'),
            Node(building='FGM', number='2', name='4th Floor', identity='Stairs'),
            Node(building='FGM', number='', name='4th Floor', identity='Elevator'),
            Node(building='FGM', number='', name='4th Floor', identity='Fire Exit'),

            Node(building='FGM', number='401', name='CR Men', identity='Comfort Room'),
            Node(building='FGM', number='411', name='CR Women', identity='Comfort Room'),

            Node(building='FGM', number='402', name='', identity='Room'),
            Node(building='FGM', number='403', name='', identity='Room'),
            Node(building='FGM', number='405', name='', identity='Room'),
            Node(building='FGM', number='406', name='', identity='Room'),
            Node(building='FGM', number='407', name='Stock Room', identity='Storage'),
            Node(building='FGM', number='', name='', identity='Tambayanan'),
            Node(building='FGM', number='408', name='Electrical Room', identity='Room'),
            Node(building='FGM', number='409', name='', identity='Room'),
            Node(building='FGM', number='410', name='', identity='Room'),
        ]

        fgm_floor_5 = [
            Node(building='FGM', number='1', name='5th Floor', identity='Stairs'),
            Node(building='FGM', number='2', name='5th Floor', identity='Stairs'),
            Node(building='FGM', number='', name='5th Floor', identity='Elevator'),
            Node(building='FGM', number='', name='5th Floor', identity='Fire Exit'),

            Node(building='FGM', number='501', name='CR Men', identity='Comfort Room'),
            Node(building='FGM', number='514', name='CR Women', identity='Comfort Room'),

            Node(building='FGM', number='502', name='Criminology Lab', identity='Laboratory'),
            Node(building='FGM', number='503', name='', identity='Room'),
            Node(building='FGM', number='505', name='Interrogation Room', identity='Room'),
            Node(building='FGM', number='506', name='Dark Room Forensic Photography', identity='Room'),
            Node(building='FGM', number='507', name='Crime Scene Room', identity='Room'),
            Node(building='FGM', number='508', name='Faculty Lounge', identity=''),
            Node(building='FGM', number='509', name='Court Room', identity='Room'),
            Node(building='FGM', number='510', name='', identity='Room'),
            Node(building='FGM', number='511', name='Electrical Room', identity='Room'),
            Node(building='FGM', number='512', name='', identity='Room'),
            Node(building='FGM', number='513', name='', identity='Room'),
        ]

        fgm_floor_6 = [
            Node(building='FGM', number='1', name='6th Floor', identity='Stairs'),
            Node(building='FGM', number='2', name='6th Floor', identity='Stairs'),
            Node(building='FGM', number='', name='6th Floor', identity='Elevator'),
            Node(building='FGM', number='', name='6th Floor', identity='Fire Exit'),

            Node(building='FGM', number='601', name='CR Men', identity='Comfort Room'),
            Node(building='FGM', number='612', name='CR Women', identity='Comfort Room'),

            Node(building='FGM', number='602', name='', identity='Room'),
            Node(building='FGM', number='603', name='', identity='Room'),
            Node(building='FGM', number='604', name='', identity='Room'),
            Node(building='FGM', number='605', name='', identity='Room'),
            Node(building='FGM', number='607', name='', identity='Room'),
            Node(building='FGM', number='608', name='', identity='Room'),
            Node(building='FGM', number='609', name='Electrical Room', identity='Room'),
            Node(building='FGM', number='610', name='', identity='Room'),
            Node(building='FGM', number='611', name='', identity='Room'),
        ]

        fgm_passage = [
            Node(building='FGM', number='', name='ERM', identity='Passage'),
            Node(building='FGM', number='', name='Pavement', identity='Passage'),
            Node(building='FGM', number='', name='AGM', identity='Passage'),
        ]

        fgm = [fgm_passage, fgm_floor_1, fgm_floor_2, fgm_floor_3, fgm_floor_4, fgm_floor_5, fgm_floor_6]

        rmmc = [place, emm, erm, agm, fgm]

        self.G = nx.Graph()
        for place in rmmc:
            for room in place:
                for i in room:
                        self.G.add_node(i.get_name(), data=i)

        # for node in G.nodes:
        #     print(node)

        self.G.add_edge('Pavement Path', 'Road Path')
        self.G.add_edge('Pavement Path', 'EMM to Pavement Passage')
        self.G.add_edge('Pavement Path', 'Lobby to Pavement Passage')
        self.G.add_edge('Pavement Path', 'FGM to Pavement Passage')
        self.G.add_edge('Pavement Path', 'Lobby Faculty Room')
        self.G.add_edge('Pavement Path', 'Lobby Lounge')
        self.G.add_edge('Pavement Path', 'ERM to Pavement Passage')
        self.G.add_edge('Road Path', 'AGM to Road Passage')
        self.G.add_edge('Road Path', 'Pavement Path')

        self.G.add_edge('EMM to Lobby Passage', 'Lobby Faculty Room')
        self.G.add_edge('EMM to ERM Passage', 'ERM to Pavement Passage')
        self.G.add_edge('EMM to ERM Passage', 'EMM 105 - Computer Lab C')
        self.G.add_edge('EMM to Lobby Passage', 'EMM 101 - Computer Lab A')
        self.G.add_edge('EMM 1st Floor Stairs 1', 'EMM 101 - Computer Lab A')
        self.G.add_edge('EMM 102 - Computer Lab B', 'EMM 101 - Computer Lab A')
        self.G.add_edge('EMM 102 - Computer Lab B', 'EMM Pavement Entrance')
        self.G.add_edge('EMM 102 - Computer Lab B', 'EMM 103 - MIS')
        self.G.add_edge('EMM 103 - MIS', 'EMM 104 - ITE Department')
        self.G.add_edge('EMM 104 - ITE Department', 'EMM 105 - Computer Lab C')
        self.G.add_edge('EMM 1st Floor Stairs 2', 'EMM 105 - Computer Lab C')
        self.G.add_edge('EMM 1st Floor Stairs 2', 'EMM 108 - Infirmary')
        self.G.add_edge('EMM 1st Floor Stairs 2', 'EMM Storage Room')
        self.G.add_edge('EMM 1st Floor - CR Women', 'EMM 108 - Infirmary')
        self.G.add_edge('EMM 1st Floor Stairs 1', 'EMM 2nd Floor Stairs 1')
        self.G.add_edge('EMM 1st Floor Stairs 2', 'EMM 2nd Floor Stairs 2')
        self.G.add_edge('EMM 2nd Floor Stairs 1', 'EMM 201 Room')
        self.G.add_edge('EMM 202 - BSCrim Office', 'EMM 201 Room')
        self.G.add_edge('EMM 202 - BSCrim Office', 'EMM IT Clinic')
        self.G.add_edge('EMM 203 - Marketing and Office Promotion', 'EMM IT Clinic')
        self.G.add_edge('EMM 203 - Marketing and Office Promotion', 'EMM 204 - Student Service Offices & Supreme Student Council')
        self.G.add_edge('EMM 205 - Admission Office', 'EMM 204 - Student Service Offices & Supreme Student Council')
        self.G.add_edge('EMM 205 - Admission Office', 'EMM 206 - TVET Office')
        self.G.add_edge('EMM 207 - Alumni Office', 'EMM 206 - TVET Office')
        self.G.add_edge('EMM 2nd Floor Stairs 2', 'EMM 207 - Alumni Office')
        self.G.add_edge('EMM 2nd Floor Stairs 2', 'EMM 208 - BECED Simulation Room')
        self.G.add_edge('EMM 2nd Floor - CR Men & Women', 'EMM 208 - BECED Simulation Room')
        self.G.add_edge('EMM 3rd Floor Stairs 1', 'EMM 2nd Floor Stairs 1')
        self.G.add_edge('EMM 3rd Floor Stairs 2', 'EMM 2nd Floor Stairs 2')
        self.G.add_edge('EMM 3rd Floor Stairs 1', 'EMM 301 Room')
        self.G.add_edge('EMM 302 Room', 'EMM 301 Room')
        self.G.add_edge('EMM 302 Room', 'EMM 303 Room')
        self.G.add_edge('EMM 304 Room', 'EMM 303 Room')
        self.G.add_edge('EMM 304 Room', 'EMM 305 - TEP Coordinators Office')
        self.G.add_edge('EMM 306 - Secondary Education Simulation Room', 'EMM 305 - TEP Coordinators Office')
        self.G.add_edge('EMM 306 - Secondary Education Simulation Room', 'EMM 307 - Elementary Education Simulation Room')
        self.G.add_edge('EMM 3rd Floor Stairs 2', 'EMM 307 - Elementary Education Simulation Room')
        self.G.add_edge('EMM 3rd Floor Stairs 2', 'EMM 308 - Teacher Education Program')
        self.G.add_edge('EMM 3rd Floor - CR Men & Women', 'EMM 308 - Teacher Education Program')
        self.G.add_edge('EMM 3rd Floor Stairs 1', 'EMM 4th Floor Stairs 1')
        self.G.add_edge('EMM 3rd Floor Stairs 2', 'EMM 4th Floor Stairs 2')
        self.G.add_edge('EMM 4th Floor Stairs 1', 'EMM 401 - CAS Laboratory')
        self.G.add_edge('EMM 402 - Physics Laboratory', 'EMM 401 - CAS Laboratory')
        self.G.add_edge('EMM 402 - Physics Laboratory', 'EMM Vacant Room')
        self.G.add_edge('EMM 403 - Science Lab Control Office', 'EMM Vacant Room')
        self.G.add_edge('EMM 403 - Science Lab Control Office', 'EMM 404 - Chemistry Laboratory')
        self.G.add_edge('EMM 4th Floor Stairs 2', 'EMM 404 - Chemistry Laboratory')
        self.G.add_edge('EMM 4th Floor Stairs 2', 'EMM BLIS Office')
        self.G.add_edge('EMM Theatre', 'EMM BLIS Office')
        self.G.add_edge('EMM 4th Floor Stairs 2', 'EMM 405 Room')
        self.G.add_edge('EMM 406 - International Linkages Office', 'EMM 405 Room')

        self.G.add_edge('ERM to FGM Passage', 'FGM to ERM Passage')
        self.G.add_edge('ERM to Pavement Passage', 'ERM 102 - Graduate School Library')
        self.G.add_edge('ERM to EMM Passage', 'ERM 101 - Graduate School Program')
        self.G.add_edge('ERM 101 - Graduate School Program', 'ERM 102 - Graduate School Library')
        self.G.add_edge('ERM 102 - Graduate School Library', 'ERM 1st Stairs ')
        self.G.add_edge('ERM 2nd Stairs ', 'ERM 1st Stairs ')
        self.G.add_edge('ERM 2nd Stairs ', 'ERM 201 - Foreign Books Library')
        self.G.add_edge('ERM 2nd Stairs ', 'ERM 3rd Stairs ')
        self.G.add_edge('ERM 301 - Filipino Author Library', 'ERM 3rd Stairs ')
        self.G.add_edge('ERM 4th Stairs ', 'ERM 3rd Stairs ')
        self.G.add_edge('ERM 4th Stairs ', 'ERM 401 - Theatre')

        self.G.add_edge('Lobby Faculty Room', 'Lobby Lounge')
        self.G.add_edge('Lobby Faculty Room', 'Lobby to AGM Passage')
        self.G.add_edge('Lobby Lounge', 'Lobby to AGM Passage')
        self.G.add_edge('Lobby Lounge', 'Lobby to Canteen Passage')
        self.G.add_edge('AGM Canteen', 'Lobby to Canteen Passage')
        self.G.add_edge('Lobby to AGM Passage', 'AGM to Lobby Passage')

        self.G.add_edge('AGM 1st Floor Stairs 2', 'AGM to Lobby Passage')
        self.G.add_edge('AGM 1st Floor Stairs 2', 'AGM 2nd Floor Stairs 2')
        self.G.add_edge('AGM 2nd Floor Stairs 2', 'AGM 200 - Electrical Room')
        self.G.add_edge('AGM 200 - Electrical Room', 'AGM 201 - Customs Admin Simulation Room')
        self.G.add_edge('AGM 201 - Customs Admin Simulation Room', 'AGM 202 Room')
        self.G.add_edge('AGM 203 - Criminology Internship Unit', 'AGM 202 Room')
        self.G.add_edge('AGM 204 - General Education Program', 'AGM 203 - Criminology Internship Unit')
        self.G.add_edge('AGM 204 - General Education Program', 'AGM 205 - Engineering Faculty')
        self.G.add_edge('AGM 206 Room', 'AGM 205 - Engineering Faculty')
        self.G.add_edge('AGM 206 Room', 'AGM Observation Room')
        self.G.add_edge('AGM 207 - Psyche Lab', 'AGM Observation Room')
        self.G.add_edge('AGM 207 - Psyche Lab', 'AGM 208 Room')
        self.G.add_edge('AGM 207 - Psyche Lab', 'AGM 210 Room')
        self.G.add_edge('AGM 209 - Engineering Program', 'AGM 210 Room')
        self.G.add_edge('AGM 209 - Engineering Program', 'AGM 211 Room')
        self.G.add_edge('AGM 212 - AB English Simulation Room', 'AGM 211 Room')
        self.G.add_edge('AGM 212 - AB English Simulation Room', 'AGM 213 - Communication Hub')
        self.G.add_edge('AGM 214 - Mass Communication Room', 'AGM 213 - Communication Hub')
        self.G.add_edge('AGM to Lobby Passage', 'AGM Canteen')
        self.G.add_edge('AGM Canteen', 'AGM 1st Floor Stairs 2')
        self.G.add_edge('AGM 1st Floor Stairs 2', 'AGM 110 - Bookstore & Printing Office')
        self.G.add_edge('AGM to FGM Passage', 'AGM 110 - Bookstore & Printing Office')
        self.G.add_edge('AGM to Road Passage', 'AGM 1st Floor Stairs 1')
        self.G.add_edge('AGM 101 - Hydraulics Laboratory', 'AGM 1st Floor Stairs 1')
        self.G.add_edge('AGM 101 - Hydraulics Laboratory', 'AGM 102 - Materials & Testing Laboratory')
        self.G.add_edge('AGM 102 - Materials & Testing Laboratory', 'AGM School Exit')
        self.G.add_edge('AGM to School Entrance Passage', 'AGM School Exit')
        self.G.add_edge('AGM to School Entrance Passage', 'AGM 102 - Materials & Testing Laboratory')
        self.G.add_edge('AGM to School Entrance Passage', 'Lobby to AGM Passage')
        self.G.add_edge('AGM to School Entrance Passage', 'AGM 103 - CBE Office')
        self.G.add_edge('AGM 103 - CBE Office', 'AGM 104 - CAS Office')
        self.G.add_edge('AGM 104 - CAS Office', 'AGM 106 - Counseling Office')
        self.G.add_edge('AGM 105 - Guidance Office', 'AGM Canteen')
        self.G.add_edge('AGM 105 - Guidance Office', 'AGM 106 - Counseling Office')
        self.G.add_edge('AGM 107 Room', 'AGM Canteen')
        self.G.add_edge('AGM 107 Room', 'AGM 105 - Guidance Office')
        self.G.add_edge('AGM 1st Floor Stairs 1', 'AGM 2nd Floor Stairs 1')
        self.G.add_edge('AGM 2nd Floor Stairs 1', 'AGM 216 - ETEEAP Office')
        self.G.add_edge('AGM 2nd Floor Stairs 1', 'AGM 214 - Mass Communication Room')
        self.G.add_edge('AGM Canteen', 'AGM 105 - Guidance Office')

        self.G.add_edge('FGM to AGM Passage', 'AGM to FGM Passage')
        self.G.add_edge('FGM to ERM Passage', 'FGM 1st Floor Stairs 1')
        self.G.add_edge('FGM to ERM Passage', 'FGM 101 - Male CR')
        self.G.add_edge('FGM to ERM Passage', 'FGM 102 - Faculty & Staff CR')
        self.G.add_edge('FGM to ERM Passage', 'FGM 103 - PWD CR')
        self.G.add_edge('FGM to ERM Passage', 'FGM 104 - Registrar\'s Office')
        self.G.add_edge('FGM 105 - Finance Office', 'FGM 104 - Registrar\'s Office')
        self.G.add_edge('FGM 105 - Finance Office', 'FGM 1st Floor Elevator')
        self.G.add_edge('FGM Cashier', 'FGM 1st Floor Elevator')
        self.G.add_edge('FGM Cashier', 'FGM 106 - Academic Affairs Office')
        self.G.add_edge('FGM 107 - Electrical Room', 'FGM 106 - Academic Affairs Office')
        self.G.add_edge('FGM 107 - Electrical Room', 'FGM 108 - Conference Room')
        self.G.add_edge('FGM 108 - Conference Room', 'FGM 109 - REEDO')
        self.G.add_edge('FGM 1st Floor Stairs 2', 'FGM to AGM Passage')
        self.G.add_edge('FGM to AGM Passage', 'FGM 109 - REEDO')
        self.G.add_edge('FGM to AGM Passage', 'FGM 1st Floor Stairs 2')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 109 - REEDO')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 1st Floor Stairs 1')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 1st Floor Stairs 2')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 101 - Male CR')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 102 - Faculty & Staff CR')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 103 - PWD CR')
        self.G.add_edge('FGM to Pavement Passage', 'FGM 104 - Registrar\'s Office')
        self.G.add_edge('FGM Admin Office', 'FGM 1st Floor Stairs 1')
        self.G.add_edge('FGM Admin Office', 'FGM 2nd Floor Stairs 1')
        self.G.add_edge('FGM 2nd Floor Stairs 2', 'FGM 1st Floor Stairs 2')
        self.G.add_edge('FGM 201 - CR Men', 'FGM 2nd Floor Stairs 1')
        self.G.add_edge('FGM 201 - CR Men', 'FGM 202 - Nursing Skills Lab 1')
        self.G.add_edge('FGM 202 - Nursing Skills Lab 1', 'FGM 2nd Floor Stairs 1')
        self.G.add_edge('FGM 202 - Nursing Skills Lab 1', 'FGM 203 - Nursing Skills Lab 2')
        self.G.add_edge('FGM 2nd Floor Elevator', 'FGM 203 - Nursing Skills Lab 2')
        self.G.add_edge('FGM 2nd Floor Elevator', 'FGM 204 - COAHS Dean\'s Office')
        self.G.add_edge('FGM 2nd Floor Fire Exit', 'FGM 204 - COAHS Dean\'s Office')
        self.G.add_edge('FGM 205 - Nursing Skills Lab 3', 'FGM 204 - COAHS Dean\'s Office')
        self.G.add_edge('FGM 2nd Floor Elevator', 'FGM 206 - Anatomy Lab')
        self.G.add_edge('FGM 203 - Nursing Skills Lab 2', 'FGM 206 - Anatomy Lab')
        self.G.add_edge('FGM 207 - (BSHM-BSTM-BSOA-REM) Simulation Room', 'FGM 206 - Anatomy Lab')
        self.G.add_edge('FGM 207 - (BSHM-BSTM-BSOA-REM) Simulation Room', 'FGM 208 - BSOA-BSHM-BSTM-BSREM Office')
        self.G.add_edge('FGM 209 - Electrical Room', 'FGM 208 - BSOA-BSHM-BSTM-BSREM Office')
        self.G.add_edge('FGM 210 - Instrumentation Room & Pharma Lab Extension', 'FGM 209 - Electrical Room')
        self.G.add_edge('FGM 210 - Instrumentation Room & Pharma Lab Extension', 'FGM 211 - Nursing Skills Lab 4')
        self.G.add_edge('FGM 2nd Floor Stairs 2', 'FGM 211 - Nursing Skills Lab 4')
        self.G.add_edge('FGM 2nd Floor Stairs 2', 'FGM 212 - CR Women')
        self.G.add_edge('FGM 211 - Nursing Skills Lab 4', 'FGM 212 - CR Women')
        self.G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 2nd Floor Stairs 2')
        self.G.add_edge('FGM 2nd Floor Stairs 1', 'FGM 3rd Floor Stairs 1')
        self.G.add_edge('FGM 3rd Floor Stairs 1', 'FGM 301 - CR Men')
        self.G.add_edge('FGM 301 - CR Men', 'FGM 302 Room')
        self.G.add_edge('FGM 3rd Floor Stairs 1', 'FGM 302 Room')
        self.G.add_edge('FGM 303 Room', 'FGM 302 Room')
        self.G.add_edge('FGM 303 Room', 'FGM 3rd Floor Elevator')
        self.G.add_edge('FGM 305 - Stock Room', 'FGM 3rd Floor Elevator')
        self.G.add_edge('FGM 305 - Stock Room', 'FGM 306 Room')
        self.G.add_edge('FGM 3rd Floor Fire Exit', 'FGM 306 Room')
        self.G.add_edge('FGM 307 Room', 'FGM 2nd Floor Elevator')
        self.G.add_edge('FGM 307 Room', 'FGM 303 Room')
        self.G.add_edge('FGM 307 Room', 'FGM 308 Room')
        self.G.add_edge('FGM 309 Room', 'FGM 308 Room')
        self.G.add_edge('FGM 309 Room', 'FGM 3rd Floor - Electrical Room')
        self.G.add_edge('FGM 3rd Floor - Electrical Room', 'FGM 308 Room')
        self.G.add_edge('FGM 3rd Floor - Electrical Room', 'FGM 3rd Floor - Counseling Room')
        self.G.add_edge('FGM 311 Room', 'FGM 3rd Floor - Counseling Room')
        self.G.add_edge('FGM 312 Room', 'FGM 311 Room')
        self.G.add_edge('FGM 312 Room', 'FGM 313 - CR Women')
        self.G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 313 - CR Women')
        self.G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 312 Room')
        self.G.add_edge('FGM 3rd Floor Stairs 2', 'FGM 4th Floor Stairs 2')
        self.G.add_edge('FGM 4th Floor Stairs 1', 'FGM 3rd Floor Stairs 1')
        self.G.add_edge('FGM 4th Floor Stairs 1', 'FGM 401 - CR Men')
        self.G.add_edge('FGM 4th Floor Stairs 1', 'FGM 402 Room')
        self.G.add_edge('FGM 401 - CR Men', 'FGM 402 Room')
        self.G.add_edge('FGM 403 Room', 'FGM 402 Room')
        self.G.add_edge('FGM 403 Room', 'FGM 4th Floor Elevator')
        self.G.add_edge('FGM 404 Room', 'FGM 4th Floor Elevator')
        self.G.add_edge('FGM 404 Room', 'FGM 405 Room')
        self.G.add_edge('FGM 4th Floor Fire Exit', 'FGM 405 Room')
        self.G.add_edge('FGM 406 Room', 'FGM 4th Floor Elevator')
        self.G.add_edge('FGM 406 Room', 'FGM 403 Room')
        self.G.add_edge('FGM 406 Room', 'FGM 407 - Stock Room')
        self.G.add_edge('FGM 406 Room', 'FGM Tambayanan')
        self.G.add_edge('FGM Tambayanan', 'FGM 408 - Electrical Room')
        self.G.add_edge('FGM 407 - Stock Room', 'FGM 408 - Electrical Room')
        self.G.add_edge('FGM 409 Room', 'FGM 408 - Electrical Room')
        self.G.add_edge('FGM 409 Room', 'FGM 410 Room')
        self.G.add_edge('FGM 411 - CR Women', 'FGM 410 Room')
        self.G.add_edge('FGM 411 - CR Women', 'FGM 4th Floor Stairs 2')
        self.G.add_edge('FGM 410 Room', 'FGM 4th Floor Stairs 2')
        self.G.add_edge('FGM 5th Floor Stairs 2', 'FGM 4th Floor Stairs 2')
        self.G.add_edge('FGM 5th Floor Stairs 1', 'FGM 4th Floor Stairs 1')
        self.G.add_edge('FGM 5th Floor Stairs 1', 'FGM 501 - CR Men')
        self.G.add_edge('FGM 5th Floor Stairs 1', 'FGM 502 - Criminology Lab')
        self.G.add_edge('FGM 501 - CR Men', 'FGM 502 - Criminology Lab')
        self.G.add_edge('FGM 503 Room', 'FGM 502 - Criminology Lab')
        self.G.add_edge('FGM 503 Room', 'FGM 5th Floor Elevator')
        self.G.add_edge('FGM 5th Floor Elevator', 'FGM 505 - Interrogation Room')
        self.G.add_edge('FGM 505 - Interrogation Room', 'FGM 506 - Dark Room Forensic Photography')
        self.G.add_edge('FGM 5th Floor Fire Exit', 'FGM 506 - Dark Room Forensic Photography')
        self.G.add_edge('FGM 507 - Crime Scene Room', 'FGM 506 - Dark Room Forensic Photography')
        self.G.add_edge('FGM 507 - Crime Scene Room', 'FGM 508 - Faculty Lounge')
        self.G.add_edge('FGM 509 - Court Room', 'FGM 508 - Faculty Lounge')
        self.G.add_edge('FGM 509 - Court Room', 'FGM 510 Room')
        self.G.add_edge('FGM 511 - Electrical Room', 'FGM 510 Room')
        self.G.add_edge('FGM 512 Room', 'FGM 511 - Electrical Room')
        self.G.add_edge('FGM 512 Room', 'FGM 513 Room')
        self.G.add_edge('FGM 514 - CR Women', 'FGM 513 Room')
        self.G.add_edge('FGM 514 - CR Women', 'FGM 5th Floor Stairs 2')
        self.G.add_edge('FGM 513 Room', 'FGM 5th Floor Stairs 2')
        self.G.add_edge('FGM 6th Floor Stairs 2', 'FGM 5th Floor Stairs 2')
        self.G.add_edge('FGM 6th Floor Stairs 1', 'FGM 5th Floor Stairs 1')
        self.G.add_edge('FGM 6th Floor Stairs 1', 'FGM 601 - CR Men')
        self.G.add_edge('FGM 6th Floor Stairs 1', 'FGM 602 Room')
        self.G.add_edge('FGM 601 - CR Men', 'FGM 602 Room')
        self.G.add_edge('FGM 603 Room', 'FGM 602 Room')
        self.G.add_edge('FGM 603 Room', 'FGM 6th Floor Elevator')
        self.G.add_edge('FGM 604 Room', 'FGM 6th Floor Elevator')
        self.G.add_edge('FGM 604 Room', 'FGM 605 Room')
        self.G.add_edge('FGM 606 Room', 'FGM 6th Floor Elevator')
        self.G.add_edge('FGM 606 Room', 'FGM 603 Room')
        self.G.add_edge('FGM 606 Room', 'FGM 607 Room')
        self.G.add_edge('FGM 608 Room', 'FGM 607 Room')
        self.G.add_edge('FGM 6th Floor Fire Exit', 'FGM 607 Room')
        self.G.add_edge('FGM 608 Room', 'FGM 609 - Electrical Room')
        self.G.add_edge('FGM 607 Room', 'FGM 609 - Electrical Room')
        self.G.add_edge('FGM 610 Room', 'FGM 609 - Electrical Room')
        self.G.add_edge('FGM 610 Room', 'FGM 611 Room')
        self.G.add_edge('FGM 612 - CR Women', 'FGM 611 Room')
        self.G.add_edge('FGM 612 - CR Women', 'FGM 6th Floor Stairs 2')
        self.G.add_edge('FGM 611 Room', 'FGM 6th Floor Stairs 2')
        
        self.G.add_edge('FGM 6th Floor Fire Exit', 'FGM 5th Floor Fire Exit')
        self.G.add_edge('FGM 4th Floor Fire Exit', 'FGM 5th Floor Fire Exit')
        self.G.add_edge('FGM 4th Floor Fire Exit', 'FGM 3rd Floor Fire Exit')
        self.G.add_edge('FGM 2nd Floor Fire Exit', 'FGM 3rd Floor Fire Exit')

    def show_figure(self):
        plt.figure(figsize=(24, 24),
        dpi=200)

        pos = nx.spring_layout(self.G, k=0.8, iterations=100, seed=42)

        nx.draw_networkx_edges(
            self.G, pos,
            alpha=0.15,
            width=0.8,
            edge_color="black"
        )

        nx.draw_networkx_nodes(
            self.G, pos,
            node_size=80,
            node_color="skyblue",
            linewidths=0
        )

        nx.draw_networkx_labels(
            self.G, pos,
            font_size=7
        )

        plt.axis("off")
        plt.tight_layout()
        plt.show()

    def print_nodes(self):
        for node in self.G.nodes:
            print(node)

    def print_isolated(self):
        no_edges = nx.isolates(self.G)
        n = list(no_edges)
        for node in n:
            print(node)

    def get_shortest_path(self, source, target):
        return nx.shortest_path(self.G, source=source, target=target)
    
    def get_multiple_paths(self, source, target):
        return nx.all_shortest_paths(self.G, source=source, target=target)

    def get_easy_path(self):
        pass